"use strict";

// var sha1 = require('sha1');
// var fs = require('fs');
// var path = require('path');
var clc = require('cli-color');
var read = require('read')
var sys = require('sys')
var Enum = require('enum');
var exec = require('child_process').exec;
var rek = require('rekuire');

var linksUtils = rek('linksUtils');

var phase = "dry";
var currentLink = null;

module.exports = {
    run: run
};

function run(link) {
    currentLink = link;
    if (!linksUtils.varify(currentLink)) {
        return console.log(clc.red("Link invalid!"));
    }
    promptForExecution();
}

function promptForExecution() {
    var command = 'rsync -Phavyx --delete-after ' + currentLink.source + " " + currentLink.target + " --dry-run";
    var outputColorFunction = clc.yellow;
    if (phase == "wet") {
        command = command.replace(" --dry-run","");
        outputColorFunction = clc.red;
    }

    read({prompt: "Execute command? : [N/y]\n" + outputColorFunction(command) + "\n"}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        }
        if (~["y","Y","yes","YES"].indexOf(input)) {
          exec(command, executeCallback);
        }
    });
}

function executeCallback(error, stdout, stderr) {
    if (error) return console.log(error);
    if (stderr) return console.log(stderr);
    sys.puts(stdout);
    if (phase == "wet") {
      return;
    }
    phase = "wet";
    promptForExecution();
}

////////////////////////////////////////////////////////////////////////////////

