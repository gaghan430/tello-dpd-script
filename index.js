/*
 * @Author: Dodik Gaghan
 * @Date:   2016-02-15 11:52:33
 * @Last Modified by:   gaghan
 * @Last Modified time: 2016-02-25 09:31:00
 */

'use strict';

var Script = require('deployd/lib/script');
var _ = require('underscore');
var appRoot = require('app-root-path');

var _run = Script.prototype.run;
Script.prototype.run = function(ctx, domain, fn) {
    if (typeof domain === 'object') {
        var parts = ctx.url.split('/').filter(function(p) {
            return p;
        });

        domain.appRoot = appRoot;
        domain.url = ctx.url;
        domain.parts = parts;
        domain.query = ctx.query;
        domain.body = ctx.body;
        domain.reqlib = appRoot.require;
        domain.helper = appRoot.require('/lib/helper.js')(ctx, domain);
        domain.me = domain.helper.meJwt;
        domain.isMe = domain.helper.isMeJwt;
        
        domain.toUrl = function(path) {
            return 'http://' + ctx.req.headers.host + '/' + path;
        }
        domain.require = function(module) {
            return require(module);
        }
        domain.validate = function(object) {
            var result = _.every(_.values(object), function(item) {
                return item;
            });
            if (!result) {
                var errors = _.mapObject(object, function(v, k) {
                    if (!v) return 'Invalid';
                });
                ctx.done({
                    errors: errors
                });
                throw errors;
            }
            return true;
        }
    }
    _run.call(this, ctx, domain, fn);
}