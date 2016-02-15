/* 
 * @Author: Dodik Gaghan
 * @Date:   2016-02-15 11:52:33
 * @Last Modified by:   Dodik Gaghan
 * @Last Modified time: 2016-02-15 12:01:12
 */

'use strict';

var Script = require('deployd/lib/script');
var _run = Script.prototype.run;
Script.prototype.run = function(ctx, domain, fn) {
	if (typeof domain === 'object') {
		domain.url = ctx.url;
		domain.parts = parts;
		domain.query = ctx.query;
		domain.body = ctx.body;
		domain.require = function(module) {
			return require(module);
		}
		domain.setResponse = function(val) {
			result = val;
		}
	}
	_run.call(this, ctx, domain, fn);
}