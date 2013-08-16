"use strict";

var clc = require('cli-color');
var read = require('read')
var sys = require('sys')
var spawn = require('child_process').spawn;
var rek = require('rekuire');

var linksUtils = rek('linksUtils');

module.exports = {
    run: run
};

//TODO: What is now "link" should be "linkData", and "link" should be a class with run, execute, etc.

function run(link) {
    if (!linksUtils.varify(link)) {
        return console.log(clc.red("Link invalid!"));
    }
    promptForExecution(link, false);
}

function promptForExecution(link, wet) {
    var commandArgs = parseCommandArgs(link, wet);
    read({prompt: parsePrompt(commandArgs, wet)}, function(error, input, isDefault) {
        if (error) {
            return console.log(clc.red("Error handling input, or input invalid!"));
        } else if (isAnswerPositive(input, wet)) {
          execute(link, commandArgs, wet);
        }
    });
}

function execute(link, commandArgs, wet) {
    var command = spawn('rsync', commandArgs);
    command.stdout.on('data', outputBuffer);
    command.stderr.on('data', outputBuffer);
    command.on('exit', function (code) {
      if (code !== 0) {
        return console.log('child process exited with code ' + code);
      } else if (!wet) {
        promptForExecution(link, true);
      }
    });
}

function parseCommandArgs(link, wet) {
  var commandArgs = [link.source, link.target, "-Phavyx", "--delete-after", "--dry-run"];
  if (wet) {
    var dryIndex = commandArgs.indexOf("--dry-run");
    if (~dryIndex) {
      commandArgs.splice(dryIndex, 1);
    }
  }
  return commandArgs;
}

function outputBuffer(data) {
    console.log(data.toString().replace("\n",""));
}

function parsePrompt(commandArgs, wet) {
  return [(wet ? clc.red : clc.yellow)("rsync " + commandArgs.join(" ")), "\nExecute command? : ", wet ? "[N/yes]" : "[N/y]", "\n"].join(" ");
}

function isAnswerPositive(input, wet) {
  return (wet && input.toLowerCase() == "yes") || (!wet &&  input.toLowerCase() == "y");
}
////////////////////////////////////////////////////////////////////////////////




