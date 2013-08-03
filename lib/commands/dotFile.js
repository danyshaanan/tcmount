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
    remove: remove
};


function create() {
    if (getId()) {
        return null;
    }
    var hash = sha1(dotFilePath + "," + new Date().getTime());
    fs.writeFileSync(dotFilePath, hash);
    return hash;
}

function getId() {
    return fs.existsSync(dotFilePath) && fs.readFileSync(dotFilePath);
}

function remove() {
    if (fs.existsSync(dotFilePath)) {
        fs.unlinkSync(dotFilePath);
    }
}
