"use strict";

var sha1 = require('sha1');
var fs = require('fs');
var path = require('path');
var rek = require('rekuire');
var clc = require('cli-color');

var getCwd = rek('getCwd');

var dotFilePath = path.resolve(getCwd() + "/.nsyrc");

module.exports = {
    create: create,
    getId: getId,
    remove: remove,
    exists: exists
};


function create() {
    if (exists()) {
        return null;
    }
    var hash = sha1(dotFilePath + "," + new Date().getTime());
    fs.writeFileSync(dotFilePath, hash);
    return hash;
}

function getId() {
    return exists() && fs.readFileSync(dotFilePath);
}

function remove() {
    if (exists()) {
        fs.unlinkSync(dotFilePath);
        return true;
    }
    return false;
}

function exists() {
    return fs.existsSync(dotFilePath);
}