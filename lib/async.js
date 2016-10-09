'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var asyncTime = function asyncTime(report, fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (typeof fn !== 'function') {
            throw new Error('can only be applied to not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
        }

        var t0 = Date.now();
        var lastArg = args.pop();

        // count highter order function time
        if (typeof lastArg === 'function') {
            args.push(function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                var t1 = Date.now();
                lastArg.apply(undefined, args);
                report.apply(undefined, [t1 - t0].concat(args));
            });
        }

        fn.apply(undefined, args);
    };
};