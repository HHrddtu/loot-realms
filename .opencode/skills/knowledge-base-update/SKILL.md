---
name: knowledge-base-update
description: >
  Use this skill whenever you learn something important during a conversation:
  a key architectural decision, a project-specific convention, a bug root-cause,
  a 3rd-party API quirk, or any fact that would help a future agent avoid
  re-doing the same research. Writes structured entries to the knowledge base
  so that context persists across conversations and agents.
---

# Knowledge Base Update Skill

## When to Trigger

Activate this skill when any of the following occur:
- An architectural or tech-stack decision is made (and the *why* matters)
- A non-obvious bug is fixed (root cause + fix documented)
- A 3rd-party service/API has a quirk, limit, or gotcha discovered
- A project convention is established (naming, folder structure, patterns)
- A research question is answered after significant investigation
- A "we tried X and it failed because Y" moment happens

## Step-by-Step Process

### 1. Identify the Entry Type

| Type | When to Use |
|------|------------|
| `decision` | Architecture, tech choices, trade-offs |
| `convention` | Naming rules, code patterns, folder structures |
| `bug` | Root cause + fix for a non-obvious problem |
| `gotcha` | 3rd-party quirk, env issue, edge case trap |
| `research` | Answer to a question requiring significant investigation |

### 2. Determine the File Path

Write to: `инструкция/14-knowledge/<slug>.md`

- `slug` = kebab-case summary (e.g., `spell-projectile-collision-optimization`)
- If entry for this topic exists — **update it**, don't create new
- Group related topics under subfolders if needed: `14-knowledge/combat/`, `14-knowledge/ui/`

### 3. Write the Entry

Use the appropriate template from `инструкция/14-knowledge/_templates/`:

- `decision-template.md` — for architectural decisions
- `convention-template.md` — for code patterns and rules
- `gotcha-template.md` — for API quirks and edge cases
- `bug-template.md` — for bug fixes

Each template has required fields:
- `type` — one of: decision, convention, bug, gotcha, research
- `topic` — short human-readable title
- `date` — YYYY-MM-DD (mandatory)
- Summary, Context, Decision/Finding, Rationale, Consequences, References

### 4. Update the Index

After writing the entry, add a row to `инструкция/14-knowledge/INDEX.md`:

```
| YYYY-MM-DD | <type> | [<topic>](<slug>.md) | <one-line summary> |
```

### 5. Create Links to Existing Knowledge

For every new entry, find and add `[[wiki-links]]` to at least 2 related entries:
- Check existing entries in INDEX.md
- Link to related files in `инструкция/04-systems/`, `06-mechanics/`, etc.
- This builds the knowledge graph over time

### 6. Confirm to User

Report:
- What was saved and where
- The one-line summary added to the index
- Links created to other knowledge entries

## Rules

- **Never summarize vaguely.** "We decided to use X" is useless without *why*.
- **Include the anti-pattern.** If something was tried and rejected, document it.
- **Keep entries atomic.** One topic per file.
- **Date is mandatory.** Future agents need to know freshness.
- **If in doubt, write it.** Cost of redundant entry is low. Cost of missing one is re-doing work.
- **Always link** to at least 2 existing knowledge entries.
