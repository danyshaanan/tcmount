"use strict";

// var sha1 = require('sha1');
// var fs = require('fs');
// var path = require('path');
var clc = require('cli-color');
var rek = require('rekuire');

var linksUtils = rek('linksUtils');

module.exports = {
    run: run
};

function run(link) {
    if (!linksUtils.varify(link)) {
        return console.log(clc.red("Link invalid!"));
    }
    var command = 'rsync -Phavyx --delete-after --dry-run ' + link.source + " " + link.target;

    console.log(clc.yellow(command));
    console.log(clc.red("Run is not yet implemented!!"));
}

////////////////////////////////////////////////////////////////////////////////

