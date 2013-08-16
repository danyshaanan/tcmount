"use strict";

var clc = require('cli-color');
var read = require('read')
var sys = require('sys')
var spawn = require('child_process').spawn;
var rek = require('rekuire');

var linksUtils = rek('linksUtils');

var phase = "dry";
var currentLink = null;

module.exports = {
    run: run
};

function run(link) {
    if (currentLink) return console.log(clc.red("Error! Haven't finished running the previous link."))
    currentLink = link;
    if (!linksUtils.varify(currentLink)) {
        return console.log(clc.red("Link invalid!"));
    }
    promptForExecution();
}

function promptForExecution() {
    var commandArgs = [currentLink.source, currentLink.target, "-Phavyx", "--delete-after", "--dry-run"];
    var outputColorFunction = clc.yellow;
    if (phase == "wet") {
        removeDryRun(commandArgs);
        outputColorFunction = clc.red;
    }

    read({prompt: outputColorFunction("rsync " + commandArgs.join(" ")) + "\nExecute command? : [N/y]\n"}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        }
        if (~["y","Y","yes","YES"].indexOf(input)) {
          execute(commandArgs);
        }
    });
}

function execute(commandArgs) {
    var command = spawn('rsync', commandArgs);
    command.stdout.on('data', outputBuffer);
    command.stderr.on('data', outputBuffer);
    command.on('exit', function (code) {
      if (code !== 0) {
        return console.log('child process exited with code ' + code);
      }
      if (phase == "wet") {
        currentLink = null;
        return;
      }
      phase = "wet";
      promptForExecution();
    });
}

function outputBuffer(data) {
    console.log(data.toString().replace("\n",""));
}

function removeDryRun(args) {
    var dryIndex = args.indexOf("--dry-run");
    if (~dryIndex) {
      args.splice(dryIndex, 1);
    }
}
////////////////////////////////////////////////////////////////////////////////




