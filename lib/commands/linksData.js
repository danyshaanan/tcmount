"use strict";

var clc = require('cli-color');
var rek = require('rekuire');

var SettingsFacade = rek('SettingsFacade');
var settings = new SettingsFacade(getUserHome() + "/.tcmount");

module.exports = {
    all: all,
    add: add,
    get: get,
    removeById: removeById,
    guessLink: guessLink
};

function all() {
    return settings.read('links') || [];
}

function add(link) {
    var links = settings.read('links') || [];
    var maxid = getMaxId() + 1;
    link.id = maxid;
    links.push(link);
    settings.write('links', links);
    settings.write('maxid', maxid);
    console.log(clc.green("Link created with id #" + link.id));
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
        if (link.id == id) {
            return false;
        }
        return true;
    });
    var newLength = links.length;
    if (originalLength == newLength) {
        return false;
    }
    settings.write('links', links);
    return true;
}

function guessLink(hint) {
    var byid = get(parseInt(hint));
    if (byid) {
        return byid;
    }
    hint = hint.replace(/\/$/,'');
    var links = settings.read('links') || [];
    for (var i in links) {
        var link = links[i];
        if (isSuffixOf(hint, link.file) || isSuffixOf(hint, link.mountpoint)) {
            return link;
        }
    }
    console.log(clc.red('What did you mean by that??'));
    console.log('Try "tcmount -h" for help.');
    return false;
}

///////////////

function isSuffixOf(short, long) {
    return long.substr(long.length - short.length) == short;
}

function getMaxId() {
    var links = settings.read('links') || [];
    var maxId = links.reduce(function(prev, curr, index, array) {
        return Math.max(prev, curr.id)
    }, settings.read('maxid') || 0);
    return maxId;
}

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}
