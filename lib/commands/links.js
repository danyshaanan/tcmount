"use strict";

var path = require('path');
var rek = require('rekuire');

var getCwd = rek('getCwd');
var SettingsFacade = rek('SettingsFacade');
var settings = new SettingsFacade(getCwd() + "/../settings.json");

module.exports = {
    all: all,
    set: set,
    find: find
    // get: get,
    // remove: remove
};

function all() {
    return settings.read('links') || [];
}

function set(link) {
    var links = settings.read('links') || [];
    links.push(link);
    settings.write('links', links);
}

function find(dir, field) {
    var links = settings.read('links') || [];
    links = links.filter(function(link) {
        return ((field in link) && (path.relative(link[field],dir) == ''));
    });
    return links;
}