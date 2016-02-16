/* 
 * @Author: Dodik Gaghan
 * @Date:   2016-02-15 11:52:33
 * @Last Modified by:   Dodik Gaghan
 * @Last Modified time: 2016-02-15 18:02:59
 */

'use strict';

var Script = require('deployd/lib/script');
var _ = require('underscore');
var randomstring = require("randomstring");

var _run = Script.prototype.run;
Script.prototype.run = function(ctx, domain, fn) {
	if (typeof domain === 'object') {
		var parts = ctx.url.split('/').filter(function(p) {
			return p;
		});

		domain.url = ctx.url;
		domain.parts = parts;
		domain.query = ctx.query;
		domain.body = ctx.body;
		domain.validate = function(object) {
			var result = _.every(_.values(object), function(item) {
				return item;
			});
			var err = {
				message: 'Validation Error',
				errors: object
			};
			if (!result) {
				ctx.done(err);
				throw err;
			}
			return true;
		}
		domain.require = function(module) {
			return require(module);
		}
		domain.randomstring = function(options) {
			return randomstring.generate(options);
		}
	}
	_run.call(this, ctx, domain, fn);
}