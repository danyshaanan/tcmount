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
    if (phase == "wet") {
        removeDryRun(commandArgs);
    }

    read({prompt: parsePrompt(phase, commandArgs)}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        } else if (isAnswerPositive(phase, input)) {
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

function parsePrompt(phase, commandArgs) {
  var outputColorFunction = (~commandArgs.indexOf("--dry-run")) ? clc.yellow : clc.red;
  var prompt = outputColorFunction("rsync " + commandArgs.join(" ")) + "\nExecute command? : " + ((phase == "wet") ? "[N/yes]" : "[N/y]") + "\n";
  return prompt;
}

function isAnswerPositive(phase, input) {
  return (phase == "wet" && input.toLowerCase() == "yes") || (phase == "dry" &&  input.toLowerCase() == "y");
}
////////////////////////////////////////////////////////////////////////////////




