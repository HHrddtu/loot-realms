const { execSync, spawn } = require('child_process');

// Start vite dev server
const server = spawn('npx', ['vite', '--host'], {
  cwd: 'C:\\Users\\pvova\\Desktop\\WebGame',
  stdio: 'ignore',
  detached: true,
  shell: true
});
server.unref();

console.log('Waiting for server...');
setTimeout(async () => {
  try {
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:\\Users\\pvova\\Desktop\\WebGame\\screenshot_login.png' });
    console.log('Screenshot saved!');
    await browser.close();
  } catch (e) {
    console.error('Error:', e.message);
  }
  server.kill();
  process.exit(0);
}, 8000);
