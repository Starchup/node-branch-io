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
        if (!data) return Promise.reject(new Error('Missing data'));
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
    update: function(branchKey, data) {
        if (!data) return Promise.reject(new Error('Missing data'));
        if (!branchKey) return Promise.reject(new Error('Missing branchKey'));
        if (!data.branch_secret) return Promise.reject(new Error('Missing branch_secret'));

        var path = '/v1/app/' + branchKey;
        return request(path, 'PUT', data);
    }
};

/**
 * Methods
 */
var link = {
    findById: function(branchKey, url) {
        if (!branchKey) return Promise.reject(new Error('Missing branchKey'));
        if (!url) return Promise.reject(new Error('Missing url'));

        var path = '/v1/url?url=' + url + "&branch_key=" + branchKey;
        return request(path, 'GET').then(function(res) {
            if (res) return res;
            return Promise.reject(res);
        });
    },
    create: function(branchKey, data) {
        if (!branchKey) return Promise.reject(new Error('Missing branchKey'));

        if (!data) data = {};
        if (!data.type) data.type = 2;
        if (!data.branch_key) data.branch_key = branchKey;

        var path = '/v1/url';
        return request(path, 'POST', data).then(function(res) {
            if (res) return res;
            return Promise.reject(res);
        });
    },
    createMany: function(branchKey, data) {
        if (!data) return Promise.reject(new Error('Missing data'));
        if (!branchKey) return Promise.reject(new Error('Missing branchKey'));

        data.forEach(function(link) {
            if (!link.type) link.type = 2;
        });

        var path = '/v1/url/bulk/' + branchKey;
        return request(path, 'POST', data).then(function(res) {
            if (res) return res;
            return Promise.reject(res);
        });
    },
    update: function(branchKey, url, data) {
        if (!branchKey) return Promise.reject(new Error('Missing branchKey'));
        if (!url) return Promise.reject(new Error('Missing url'));
        if (!data) return Promise.reject(new Error('Missing data'));
        if (!data.branch_secret) return Promise.reject(new Error('Missing branch_secret'));

        var path = '/v1/url/?url=' + url + "&branch_key=" + branchKey;
        return request(path, 'PUT', data);
    }
};

/**
 * Exports
 */
module.exports.app = app;
module.exports.link = link;
