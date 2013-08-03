"use strict";

var rek = require('rekuire');

var getCwd = rek('getCwd');
var SettingsFacade = rek('SettingsFacade');
var settings = new SettingsFacade(getCwd() + "/../settings.json");

module.exports = {
    set: set,
    get: get,
    remove: remove
};

function set(link) {
    var links = settings.read('links') || {};
    links[link.id] = link;
    settings.write('links', links);
}

function get(linkId) {
    var links = settings.read('links') || {};
    return links[linkId];
}

function remove(linkId) {
    var links = settings.read('links') || {};
    if (linkId in links) {
      delete links[linkId];
      settings.write('links', links);
      return true;
    }
    return false;
}