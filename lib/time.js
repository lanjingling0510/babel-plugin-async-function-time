'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isPromise(obj) {
    return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var promiseTime = function promiseTime(report, fn, fnName) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (typeof fn !== 'function') {
            throw new Error('can only be applied to not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
        }

        var t0 = Date.now();
        // const lastArg = args.slice(-1);

        // count highter order function time
        // if (typeof lastArg === 'function') {
        //     args.push((...args)  => {
        //       const t1 = Date.now();
        //       callback(...args);
        //       report(t1 - t0, ...args);
        //     });
        // }

        var fnResult = fn.apply(undefined, args);
        if (!isPromise(fnResult)) {
            throw new Error('function "' + fnName + '" should return a promise');
        }

        // count promise function time
        return fnResult.then(function (data) {
            var t1 = Date.now();
            report.apply(undefined, [t1 - t0].concat(args));
            return data;
        });
    };
};