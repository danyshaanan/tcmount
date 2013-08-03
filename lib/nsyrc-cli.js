"use strict";

var fs = require('fs');
var clc = require('cli-color');
var rek = require('rekuire');
var read = require('read')

var console = rek('console');
var getCwd = rek('getCwd');
var waiting = rek('waiting');
var links = rek('links');
var dotFile = rek('dotFile');
var rsync = rek('rsync');


module.exports = {
    link: link,
    show: show,
    run: run,
    disableColors: disableColors
};

function link() {
    read({prompt: "Source:"}, function(error, source, isDefault) {
        if (source == '') source = getCwd();
        if (error) {
            return console.log(clc.red("Link not created - Error handling input!"));
        } else if (!fs.existsSync(source + '/')) {
            return console.log(clc.red("Link not created - no such source folder!"));
        }
        console.log(clc.green("Source: " + source));

        read({prompt: "Target:"}, function(error, target, isDefault) {
            if (target == '') target = getCwd();
            if (error) {
                return console.log(clc.red("Link not created - Error handling input!"));
            } else if (!fs.existsSync(target + '/')) {
                return console.log(clc.red("Link not created - no such target folder!"));
            }
            console.log(clc.green("Target: " + target));
            links.set({ source: source, target: target });
            console.log(clc.green("Link created."));
        });
    });
}

function show() {

    var all = links.all();
    for (var i in all) {
        console.log(clc.green(all[i].source) + " ---> " + clc.green(all[i].target));
    }
    return;
}

function run() {
    //console.log("As source:\n", links.find(getCwd(), 'source'));
    rsync.run(links.get(dotFile.getId()));
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
