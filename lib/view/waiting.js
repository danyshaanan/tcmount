"use strict";
var rek = require('rekuire');
var clc = rek('cli-color');

var waitingTime = 0;

module.exports = {
    start : function(){
        waitingTime = setInterval(function(){
            process.stdout.write(clc.green("."));
        },1000)
    },
    stop: function(){
        process.stdout.write("\n");
        clearInterval(waitingTime);
    }
}