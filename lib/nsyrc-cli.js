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
    run: run,
    disableColors: disableColors
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
    var id = dotFile.getId();
    if (!id) {
        return console.log(clc.red("No id found! Invalid or non-existing dot-file."));
    }
    links.remove(id);
    dotFile.remove();
    console.log(clc.yellow("Link removed from settings and folder."));
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

function disableColors() {
    var through = function(a) { return a; };
    clc = {
        black : through,
        red : through,
        green : through,
        yellow : through,
        blue : through,
        magenta : through,
        cyan : through,
        white : through,
        blackBright : through,
        redBright : through,
        greenBright : through,
        yellowBright : through,
        blueBright : through,
        magentaBright : through,
        cyanBright : through,
        whiteBright : through
    }
}
