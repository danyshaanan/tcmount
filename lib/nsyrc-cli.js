"use strict";

var fs = require('fs');
var clc = require('cli-color');
var rek = require('rekuire');

var console = rek('console');
var getCwd = rek('getCwd');
var waiting = rek('waiting');
var links = rek('links');
var dotFile = rek('dotFile');



module.exports = {
    create: create,
    remove: remove,
    show: show,
    run: run
};

function create() {
    var id = dotFile.create();
    if (!id) {
        return console.log(clc.red("Link already exists!"));
    }
    links.set({
        id: id,
        source: getCwd()
    });
    console.log(clc.green("Link created."));
}

function remove() {
    links.remove(dotFile.getId());
    dotFile.remove();
    console.log(clc.yellow("Link removed."));
}

function show() {
    var link = links.get(dotFile.getId());
    if (!link) {
        console.log(clc.red("No dot-file or link not in settings!"));
    } else {
        console.log(link);
    }
}

function run() {
    console.log(clc.red("Run is not yet implemented!"));
}

////////////////////////////////////////////////////////////////////////////////

