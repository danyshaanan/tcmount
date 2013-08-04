"use strict";

var clc = require('cli-color');
var rek = require('rekuire');
var read = require('read')

var console = rek('console');
var getCwd = rek('getCwd');
var waiting = rek('waiting');
var links = rek('links');
var rsync = rek('rsync');
var linksUtils = rek('linksUtils');


module.exports = {
    link: link,
    unlink: unlink,
    show: show,
    run: run
};

function link(source, target) {
    if (source && target) {
        console.log(clc.green("Source: " + source));
        console.log(clc.green("Target: " + target));
        links.add({ source: source, target: target });
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
            links.add({ source: source, target: target });
        });
    });
}

function unlink(id) {
    if (typeof id == 'number' || typeof id == 'string') {
        var res = links.removeById(parseInt(id));
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
    var all = links.all();
    for (var i in all) {
        console.log(linksUtils.stringify(all[i]));
    }
}

function run(id) {
    if (typeof id == 'number' || typeof id == 'string') {
        var link = links.get(parseInt(id));
        if (!link) {
            return console.log(clc.red("Bad id!"));
        }
        console.log(clc.blue(JSON.stringify(link,null,4)));
        rsync.run(link);
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



