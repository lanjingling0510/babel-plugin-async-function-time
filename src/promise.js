function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

const promiseTime = function(report, fn, fnName) {
    return function(...args) {
        if (typeof fn !== 'function') {
            throw new Error(`can only be applied to not: ${typeof fn}`);
        }

        const t0 = Date.now();
        const fnResult = fn(...args);
        if (!isPromise(fnResult)) {
            throw new Error(`function "${fnName}" should return a promise`);
        }

        // count promise function time
        return fnResult.then(function(data) {
            const t1 = Date.now();
            report(t1 - t0, ...args);
            return data;
        });
    };
};
