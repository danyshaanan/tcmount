"use strict";

var clc = require('cli-color');
var read = require('read')
var sys = require('sys')
var spawn = require('child_process').spawn;
var rek = require('rekuire');

var linksUtils = rek('linksUtils');

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

function promptForExecution(wet) {
    var commandArgs = [currentLink.source, currentLink.target, "-Phavyx", "--delete-after", "--dry-run"];
    if (wet) {
        removeDryRun(commandArgs);
    }

    read({prompt: parsePrompt(commandArgs, wet)}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        } else if (isAnswerPositive(input, wet)) {
          execute(commandArgs, wet);
        }
    });
}

function execute(commandArgs, wet) {
    var command = spawn('rsync', commandArgs);
    command.stdout.on('data', outputBuffer);
    command.stderr.on('data', outputBuffer);
    command.on('exit', function (code) {
      if (code !== 0) {
        return console.log('child process exited with code ' + code);
      }
      if (wet) {
        currentLink = null;
      } else {
        promptForExecution(true);
      }
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

function parsePrompt(commandArgs, wet) {
  var outputColorFunction = wet ? clc.red : clc.yellow;
  var prompt = outputColorFunction("rsync " + commandArgs.join(" ")) + "\nExecute command? : " + (wet ? "[N/yes]" : "[N/y]") + "\n";
  return prompt;
}

function isAnswerPositive(input, wet) {
  return (wet && input.toLowerCase() == "yes") || (!wet &&  input.toLowerCase() == "y");
}
////////////////////////////////////////////////////////////////////////////////




