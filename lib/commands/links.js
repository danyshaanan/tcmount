"use strict";

var path = require('path');
var clc = require('cli-color');
var rek = require('rekuire');

var linksUtils = rek('linksUtils');
var getCwd = rek('getCwd');
var SettingsFacade = rek('SettingsFacade');
var settings = new SettingsFacade(getCwd() + "/../settings.json");

module.exports = {
    all: all,
    add: add,
    get: get,
    removeById: removeById
    // find: find
};

function all() {
    return settings.read('links') || [];
}

function add(link) {
    if (!linksUtils.varify(link)) {
        console.log(clc.red("Link invalid!"));
        return false;
    }
    var links = settings.read('links') || [];
    var maxid = getMaxId() + 1;
    link.id = maxid;
    links.push(link);
    settings.write('links', links);
    settings.write('maxid', maxid);
    console.log(clc.green("Link created."));
    return true;
}

function get(id) {
    var links = settings.read('links') || [];
    links = links.filter(function(link) {
        return link.id == id;
    });
    return links[0];
}

function removeById(id) {
    var links = settings.read('links') || [];
    var originalLength = links.length;
    links = links.filter(function(link) {
        return link.id != id;
    });
    var newLength = links.length;
    if (originalLength == newLength) {
        return false;
    }
    settings.write('links', links);
    return true;
}

///////////////

function getMaxId() {
    var links = settings.read('links') || [];
    var maxId = links.reduce(function(prev, curr, index, array) {
        return Math.max(prev, curr.id)
    }, settings.read('maxid') || 0);
    return maxId;
}