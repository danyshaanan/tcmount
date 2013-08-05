"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');
var path = require('path');

var getCwd = rek('getCwd');


module.exports = {
    format: format,
    varify: varify,
    stringify: stringify
};


function format(link) {
    link.source = formatFolder(link.source);
    link.target = formatFolder(link.target);
    return varify(link);
}

function varify(link) {
    return varifyFolder(link.source) && varifyFolder(link.target) && link;
}

function stringify(link) {
    return [link.id, ":", clc.green(link.source), "--->", clc.green(link.target)].join(' ');
}

////////////////////////////////////////////////////////////////////////////////

function formatFolder(folder) {
    if (folder[0] != '/' && !~folder.indexOf(':')) {
      folder = getCwd() + '/' + folder;
    }
    return path.resolve(folder) + '/';
}

function varifyFolder(folder) {
    return folder && folder[0] == '/' && folder[folder.length-1] == '/' && folderExists(folder);
}

function folderExists(folder) {
	// if (~folder.indexOf(':')) {
	// 	//remote folder
	//	return true
	// } else {
		return fs.existsSync(folder);
	// }
}