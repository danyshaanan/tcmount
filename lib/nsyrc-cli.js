"use strict";

var clc = require('cli-color');
var rek = require('rekuire');
var read = require('read')

var console = rek('console');
var getCwd = rek('getCwd');
var waiting = rek('waiting');
var linksData = rek('linksData');
// var rsync = rek('rsync');
var link = rek('Link').link;
var linksDataUtils = rek('linksDataUtils');


module.exports = {
    createLink: createLink,
    unlink: unlink,
    show: show,
    run: run
};

function createLink(source, target) {
    if (source && target) {
        console.log(clc.green("Source: " + source));
        console.log(clc.green("Target: " + target));
        linksData.add({ source: source, target: target });
        return;
    }
    read({prompt: "Source:"}, function(error, source, isDefault) {
        if (error) {
            return console.log(clc.red("Link not created - Error handling input!"));
        }
        console.log(clc.green("Source: " + source));
        read({prompt: "Target:"}, function(error, target, isDefault) {
            if (error) {
                return console.log(clc.red("Link not created - Error handling input!"));
            }
            console.log(clc.green("Target: " + target));
            linksData.add({ source: source, target: target });
        });
    });
}

function unlink(id) {
    if (typeof id == 'number' || typeof id == 'string') {
        var res = linksData.removeById(parseInt(id));
        if (!res) {
            return console.log(clc.red("Invalid id or another problem. (id: " + id + ")."));
        }
        return console.log(clc.green("Removed id #" + id));
    } else {
        show();
        read({prompt: "Which link do you want to unlink?"}, function(error, input, isDefault) {
            var id = parseInt(input);
            if (error || (typeof id != 'number') || !id) {
                return console.log(clc.red("Error handling input, or input invalid!"));
            }
            unlink(id);
        });
    }
}

function show() {
    var all = linksData.all();
    if (all.length == 0) {
        console.log(clc.yellow("There aren't any links defined yet, try something like this:"));
        console.log(clc.green("nsyrc link from ~/thisfolder/ to ~/thatfolder"));
        return;
    }
    for (var i in all) {
        console.log(linksDataUtils.stringify(all[i]));
    }
}

function run(id) {
    if (typeof id == 'number' || typeof id == 'string') {
        var linkData = linksData.get(parseInt(id));
        if (!linkData) {
            return console.log(clc.red("Bad id!"));
        }
        // console.log(clc.blue(JSON.stringify(linkData,null,4)));
        var linkItem = new link(linkData);
        linkItem.run();
    } else {
        show();
        read({prompt: "Which link do you want to run?"}, function(error, id, isDefault) {
            if (error) {
                return console.log(clc.red("Error handling input!"));
            }
            run(id);
        });
    }
}



