/**
 * Modules from the community: package.json
 */
var rp = require('request-promise');

var config = {
    options: {
        uri: 'https://api.branch.io',
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }
};

/**
 * Utility
 */
function request(path, method, parameters) {

    var options = {};
    for (var attrname in config.options) {
        options[attrname] = config.options[attrname];
    }
    options.uri += path;
    options.method = method;
    options.body = parameters;

    return rp(options);
}

/**
 * Methods
 */
var app = {
    create: function(data) {
        if (!data.user_id) return Promise.reject(new Error('Missing user_id'));
        if (!data.app_name) return Promise.reject(new Error('Missing app_name'));
        if (!data.dev_name) return Promise.reject(new Error('Missing dev_name'));
        if (!data.dev_email) return Promise.reject(new Error('Missing dev_email'));

        var path = '/v1/app';
        return request(path, 'POST', data).then(function(res) {
            if (res) return res;
            return Promise.reject(res);
        });
    },
    update: function(data) {
        if (!data.branch_key) return Promise.reject(new Error('Missing branch_key'));
        if (!data.branch_secret) return Promise.reject(new Error('Missing branch_secret'));

        var path = '/v1/app/' + data.branch_key;
        return request(path, 'PUT', data);
    }
};

/**
 * Exports
 */
module.exports.app = app;
