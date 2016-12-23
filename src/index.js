'use strict';

var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');

function noop () { return null };

function resolve (importee, id, resolveTo) {
    var resolvedId;

    if (typeof id === 'string') {
        id = new RegExp('^' + id);
    }

    if (importee.match(id)) {
        resolvedId = importee.replace(id, resolveTo);
        return path.resolve(resolvedId);
    }

    return false;
}

function pathmodify (options) {
    if (!options) options = {};
    var filter = rollupPluginutils.createFilter(options.include, options.exclude);

    if (!options.transforms) options.transforms = {};
    options.transforms.modules = false;

    if (!options.aliases) {
        return {
            name: 'pathmodify',
            resolveId: noop
        }
    }

    var aliases = options.aliases;

    return {
        name: 'pathmodify',

        resolveId: function (importee, importer) {
            if (!filter(importee)) return null;

            for (var i = 0; i < aliases.length; i++) {
                var resolvedId = resolve(importee, aliases[i].id, aliases[i].resolveTo);
                if (resolvedId) {
                    return resolvedId;
                }
            };
        }
    };
}

module.exports = pathmodify;
