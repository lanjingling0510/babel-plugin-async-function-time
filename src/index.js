
/**
 * A plugin of babel that count time for asnyc function
 *
 * @Author rainie
 * @Email chenyutian0510@gmail.com
 *
 */


const template = require('babel-template');
const fs = require('fs');
const path = require('path');


const promiseTime = fs.readFileSync(path.join(__dirname, 'promise.js'));
const asyncTime = fs.readFileSync(path.join(__dirname, 'async.js'));

const buildPromiseTime = template(`
	 (function (FUNCTION_KEY) {
		 ${promiseTime.toString()}
		 return promiseTime(REPORT, FUNCTION, NAME)
     })()
 `);

const buildAsyncTime = template(`
	 (function (FUNCTION_KEY) {
		 ${asyncTime.toString()}
		 return asyncTime(REPORT, FUNCTION)
     })()
 `);

const buildReportFunction = template(`
	 (function (FUNCTION_KEY) {
		 return REPORT_FUNCTION
     })()
 `);

export default function({types: t}) {
    return {
        visitor: {
            // 如果是函数变量声明
            ['FunctionExpression|ArrowFunctionExpression'](path, {opts}) {
                const parentIdentifier = (() => {
                    let left = path.parent.left;
                    if (path.parent.id)
                        return path.parent.id;
                    else if (path.parent.key)
                        return path.parent.key;
                    else if (left && left.type === 'Identifier')
                        return left;
                    else if (left && left.type === 'MemberExpression')
                        return left.property;
                    }
                )();

                if (!parentIdentifier)
                    return;

                const callName = parentIdentifier.name;

				let buildFunction;
                if (opts.promise && opts.promise.indexOf(callName) !== -1) {
					buildFunction = buildPromiseTime;
				} else if (opts.async && opts.async.indexOf(callName) !== -1) {
					buildFunction = buildAsyncTime;
				} else {
					return;
				}

                const uid = path.scope.generateUidIdentifier(callName);
                const ast = buildFunction({
                    REPORT: buildReportFunction({
                        FUNCTION_KEY: uid,
                        REPORT_FUNCTION: t.identifier(opts.report.toString())
                    }),
                    FUNCTION: path.node,
                    FUNCTION_KEY: uid,
                    NAME: t.stringLiteral(callName)
                });

                path.replaceWith(ast);
            },

            // 如果是函数声明
            FunctionDeclaration(path, {opts}) {
                const parentIdentifier = path.node.id;
                const callName = parentIdentifier.name;

				let buildFunction;
                if (opts.promise && opts.promise.indexOf(callName) !== -1) {
					buildFunction = buildPromiseTime;
				} else if (opts.async && opts.async.indexOf(callName) !== -1) {
					buildFunction = buildAsyncTime;
				} else {
					return;
				}

                const uid = path.scope.generateUidIdentifier(callName);
                const ast = buildFunction({
                    REPORT: buildReportFunction({
                        FUNCTION_KEY: uid,
                        REPORT_FUNCTION: t.identifier(opts.report.toString())
                    }),
                    FUNCTION: t.functionExpression(null, path.node.params, path.node.body),
                    FUNCTION_KEY: uid,
                    NAME: t.stringLiteral(callName)
                });

                path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(parentIdentifier, ast.expression)]));
            },

            // 如果是对象的属性方法
            ObjectMethod(path, {opts}) {
                if (!t.isObjectMethod(path.node, {kind: 'method'}))
                    return;

                const identifier = path.node.key;
                const callName = identifier.name;

				let buildFunction;
                if (opts.promise && opts.promise.indexOf(callName) !== -1) {
					buildFunction = buildPromiseTime;
				} else if (opts.async && opts.async.indexOf(callName) !== -1) {
					buildFunction = buildAsyncTime;
				} else {
					return;
				}

                const uid = path.scope.generateUidIdentifier(callName);
                const ast = buildFunction({
                    REPORT: buildReportFunction({
                        FUNCTION_KEY: uid,
                        REPORT_FUNCTION: t.identifier(opts.report.toString())
                    }),
                    FUNCTION: t.functionExpression(null, path.node.params, path.node.body),
                    FUNCTION_KEY: uid,
                    NAME: t.stringLiteral(callName)
                });

                path.replaceWith(t.objectProperty(t.identifier(callName), ast.expression));
            }
        }
    }
}
