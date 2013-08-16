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
    var commandLine = 'rsync -Phavyx --delete-after ' + currentLink.source + " " + currentLink.target + " --dry-run";
    var outputColorFunction = clc.yellow;
    if (phase == "wet") {
        commandLine = commandLine.replace(" --dry-run","");
        outputColorFunction = clc.red;
    }

    read({prompt: "Execute command? : [N/y]\n" + outputColorFunction(commandLine) + "\n"}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        }
        if (~["y","Y","yes","YES"].indexOf(input)) {
          execute(commandLine);
        }
    });
}

function execute(commandLine) {
    var command = spawn('rsync', commandLine.replace("rsync ","").split(" "));
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

////////////////////////////////////////////////////////////////////////////////




