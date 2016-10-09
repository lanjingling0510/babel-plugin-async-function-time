'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var _visitor;

    var t = _ref.types;

    return {
        visitor: (_visitor = {}, _defineProperty(_visitor, 'FunctionExpression|ArrowFunctionExpression', function FunctionExpressionArrowFunctionExpression(path, _ref2) {
            var opts = _ref2.opts;

            var parentIdentifier = function () {
                var left = path.parent.left;
                if (path.parent.id) return path.parent.id;else if (path.parent.key) return path.parent.key;else if (left && left.type === 'Identifier') return left;else if (left && left.type === 'MemberExpression') return left.property;
            }();

            if (!parentIdentifier) return;

            var callName = parentIdentifier.name;

            var buildFunction = void 0;
            if ([opts.promise || []].indexOf(callName) !== -1) {
                buildFunction = buildPromiseTime;
            } else if ([opts.async || []].indexOf(callName) !== -1) {
                buildFunction = buildAsyncTime;
            } else {
                return;
            }

            var uid = path.scope.generateUidIdentifier(callName);
            var ast = buildFunction({
                REPORT: buildReportFunction({
                    FUNCTION_KEY: uid,
                    REPORT_FUNCTION: t.identifier(opts.report.toString())
                }),
                FUNCTION: path.node,
                FUNCTION_KEY: uid,
                NAME: t.stringLiteral(callName)
            });

            path.replaceWith(ast);
        }), _defineProperty(_visitor, 'FunctionDeclaration', function FunctionDeclaration(path, _ref3) {
            var opts = _ref3.opts;

            var parentIdentifier = path.node.id;
            var callName = parentIdentifier.name;

            var buildFunction = void 0;
            if ([opts.promise || []].indexOf(callName) !== -1) {
                buildFunction = buildPromiseTime;
            } else if ([opts.async || []].indexOf(callName) !== -1) {
                buildFunction = buildAsyncTime;
            } else {
                return;
            }

            var uid = path.scope.generateUidIdentifier(callName);
            var ast = buildFunction({
                REPORT: buildReportFunction({
                    FUNCTION_KEY: uid,
                    REPORT_FUNCTION: t.identifier(opts.report.toString())
                }),
                FUNCTION: t.functionExpression(null, path.node.params, path.node.body),
                FUNCTION_KEY: uid,
                NAME: t.stringLiteral(callName)
            });

            path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(parentIdentifier, ast.expression)]));
        }), _defineProperty(_visitor, 'ObjectMethod', function ObjectMethod(path, _ref4) {
            var opts = _ref4.opts;

            if (!t.isObjectMethod(path.node, { kind: 'method' })) return;

            var identifier = path.node.key;
            var callName = identifier.name;

            var buildFunction = void 0;
            if ([opts.promise || []].indexOf(callName) !== -1) {
                buildFunction = buildPromiseTime;
            } else if ([opts.async || []].indexOf(callName) !== -1) {
                buildFunction = buildAsyncTime;
            } else {
                return;
            }

            var uid = path.scope.generateUidIdentifier(callName);
            var ast = buildFunction({
                REPORT: buildReportFunction({
                    FUNCTION_KEY: uid,
                    REPORT_FUNCTION: t.identifier(opts.report.toString())
                }),
                FUNCTION: t.functionExpression(null, path.node.params, path.node.body),
                FUNCTION_KEY: uid,
                NAME: t.stringLiteral(callName)
            });

            path.replaceWith(t.objectProperty(t.identifier(callName), ast.expression));
        }), _visitor)
    };
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A plugin of babel that count time for asnyc function
 *
 * @Author rainie
 * @Email chenyutian0510@gmail.com
 *
 */

var template = require('babel-template');
var fs = require('fs');
var path = require('path');

var promiseTime = fs.readFileSync(path.join(__dirname, 'promise.js'));
var asyncTime = fs.readFileSync(path.join(__dirname, 'async.js'));

var buildPromiseTime = template('\n\t (function (FUNCTION_KEY) {\n\t\t ' + promiseTime.toString() + '\n\t\t return promiseTime(REPORT, FUNCTION, NAME)\n     })()\n ');

var buildAsyncTime = template('\n\t (function (FUNCTION_KEY) {\n\t\t ' + asyncTime.toString() + '\n\t\t return asyncTime(REPORT, FUNCTION)\n     })()\n ');

var buildReportFunction = template('\n\t (function (FUNCTION_KEY) {\n\t\t return REPORT_FUNCTION\n     })()\n ');

module.exports = exports['default'];