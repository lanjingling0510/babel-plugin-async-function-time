const asyncTime = function(report, fn) {
    return function(...args) {
        if (typeof fn !== 'function') {
            throw new Error(`can only be applied to not: ${typeof fn}`);
        }

        const t0 = Date.now();
        const lastArg = args.pop();

        // count highter order function time
        if (typeof lastArg === 'function') {
            args.push((...args) => {
              const t1 = Date.now();
              lastArg(...args);
              report(t1 - t0, ...args);
            });
        }

        fn(...args);
    };
};
