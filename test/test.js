const babel = require('babel-core');
import { assert, expect } from 'chai';
import vm from 'vm';
import plugin from '../lib';


describe('test promise function', () => {

    it('if is variable declaration', () => {
		const code = `
		var func = function (str) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(str);
				}, 200);
			})
		}`;

		const result = babel.transform(code, {
		    plugins: [
		        [
		            plugin, {
		                "report": "(durning) => console.log('%sms', durning)",
		                "promise": ["func"],
		            }
		        ]
		    ]
		});

		vm.runInThisContext(result.code);
		return func('parameter').then(data => {
			expect(data).to.equal('parameter');
		});
    });

	it('if is function declaration', () => {
		const code = `
		function func (str) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(str);
				}, 200);
			})
		}`;

		const result = babel.transform(code, {
		    plugins: [
		        [
		            plugin, {
		                "report": "(durning) => console.log('%sms', durning)",
		                "promise": ["func"],
		            }
		        ]
		    ]
		});

		vm.runInThisContext(result.code);
		return func('parameter').then(data => {
			expect(data).to.equal('parameter');
		});
	});

	it('if is method of object', () => {
		const code = `
			var obj={
				func(str) {
					return new Promise(function(resolve, reject) {
						setTimeout(function() {
							resolve(str);
						}, 200);
					})
			}
		}`;

		const result = babel.transform(code, {
			plugins: [
				[
					plugin, {
						"report": "(durning) => console.log('%sms', durning)",
						"promise": ["func"],
					}
				]
			]
		});

		vm.runInThisContext(result.code);
		return func('parameter').then(data => {
			expect(data).to.equal('parameter');
		});
	});
});
