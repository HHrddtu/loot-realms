// Test stub for Phaser. Source modules import Phaser as a module, but the
// test suites provide the APIs they need on `globalThis.Phaser`. This proxy
// forwards property access to that global at call time, so tests can set the
// stub before exercising the source under test.
export default new Proxy({}, {
    get(_target, prop) {
        const stub = globalThis.Phaser;
        return stub ? stub[prop] : undefined;
    }
});
