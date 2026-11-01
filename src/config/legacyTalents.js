// Old 23–24 node trees were compressed to 10 nodes per branch.
// Nodes 1–10 kept their ids; nodes 11+ were removed. Refund their old cost
// so old saves keep the same talent-point budget.
const PATTERN_A = [7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14]; // n=11..24
const PATTERN_B = [8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];   // n=11..23

const PATTERN_B_BRANCHES = new Set(['prot', 'iron', 'pot']);
const LEGACY_ID = /^[a-z]_(fire|prot|know|acid|iron|pot|strike|link|pur)_(\d+)$/;

function costForRow(row) {
    if (row <= 2) return 1;
    if (row <= 5) return 2;
    if (row <= 8) return 3;
    if (row <= 11) return 5;
    return 8;
}

export function getLegacyTalentCost(id) {
    const match = LEGACY_ID.exec(id);
    if (!match) return 1;
    const branch = match[1];
    const index = Number(match[2]);
    if (index >= 1 && index <= 10) return 0;
    const pattern = PATTERN_B_BRANCHES.has(branch) ? PATTERN_B : PATTERN_A;
    const row = pattern[index - 11];
    if (row === undefined) return 1;
    return costForRow(row);
}
