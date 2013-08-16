"use strict";

var rek = require('rekuire');
var clc = rek('cli-color');

var waitingTime = 0;

module.exports = {
    start : start,
    stop: stop
};

function start(message) {
  clearInterval(waitingTime);
  process.stdout.write(clc.green(message));
  waitingTime = setInterval(function(){
    process.stdout.write(clc.green("."));
  }, 100);
}


function stop(message) {
  process.stdout.write(clc.green(message + "\n"));
  clearInterval(waitingTime);
}