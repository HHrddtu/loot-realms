/**
 * Git Auto-Sync for Loot Realms
 * 
 * Запускается вместе с `npm run dev`.
 * Каждые 60 секунд автоматически пуллит, коммитит и пушит изменения.
 * 
 * Использование: node bin/git-sync.js
 * (или через npm run dev:sync)
 */

import { execSync } from 'child_process';
import { watch } from 'fs';
import { resolve } from 'path';

const SRC_DIR = resolve(import.meta.dirname, '..', 'src');
const COOLDOWN_MS = 30_000; // 30 секунд после последнего изменения
const PULL_INTERVAL_MS = 60_000; // пуллить каждую минуту
const COMMIT_PREFIX = '⚡ auto-sync';

let lastChange = 0;
let syncTimer = null;
let pullTimer = null;

function run(cmd) {
    try {
        const out = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
        return out.trim();
    } catch (e) {
        return e.stderr?.trim() || e.message;
    }
}

function gitPull() {
    const result = run('git pull --rebase --autostash');
    if (result && !result.includes('Already up to date') && !result.includes('up-to-date')) {
        if (!result.includes('CONFLICT')) {
            console.log(`[git-sync] pulled: ${result.slice(0, 200)}`);
        } else {
            console.warn(`[git-sync] CONFLICT during pull! Resolve manually.`);
        }
    }
}

function gitCommitAndPush() {
    const status = run('git status --porcelain');
    if (!status) return; // нет изменений

    const files = status.split('\n').filter(Boolean).length;
    const msg = `${COMMIT_PREFIX} (${files} files)`;
    
    const addResult = run('git add -A');
    if (addResult && addResult.length > 0) {
        console.log(`[git-sync] add: ${addResult}`);
    }
    
    const commitResult = run(`git commit -m "${msg}" --no-verify`);
    if (commitResult && commitResult.includes('nothing to commit')) return;
    if (commitResult && commitResult.includes('changed')) {
        const pushResult = run('git push');
        console.log(`[git-sync] auto-pushed ${files} files: ${commitResult.slice(0, 100)}`);
    }
}

function onFileChange(eventType, filename) {
    if (!filename || filename.includes('node_modules') || filename.startsWith('.')) return;
    lastChange = Date.now();
}

function checkAndSync() {
    if (lastChange > 0 && (Date.now() - lastChange) >= COOLDOWN_MS) {
        lastChange = 0;
        gitCommitAndPush();
    }
}

function startWatching() {
    // Watch src directory recursively
    const watchers = [];
    function watchDir(dir) {
        try {
            const w = watch(dir, { recursive: true }, onFileChange);
            watchers.push(w);
            return true;
        } catch (e) {
            return false;
        }
    }

    watchDir(SRC_DIR);
    
    // Also watch root config files
    ['opencode.json', 'package.json', 'vite.config.js'].forEach(f => {
        try {
            const w = watch(f, onFileChange);
            watchers.push(w);
        } catch (e) {}
    });

    console.log(`[git-sync] watching ${SRC_DIR} for changes...`);
    console.log(`[git-sync] auto-pull every ${PULL_INTERVAL_MS / 1000}s, auto-commit after ${COOLDOWN_MS / 1000}s of inactivity`);

    // Periodic pull
    pullTimer = setInterval(gitPull, PULL_INTERVAL_MS);
    
    // Periodic check for changes to commit
    syncTimer = setInterval(checkAndSync, 5000);

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n[git-sync] shutting down...');
        clearInterval(pullTimer);
        clearInterval(syncTimer);
        watchers.forEach(w => w.close());
        // Final commit before exit
        gitCommitAndPush();
        process.exit(0);
    });
}

// Initial pull on start
console.log('[git-sync] initial pull...');
gitPull();
startWatching();
