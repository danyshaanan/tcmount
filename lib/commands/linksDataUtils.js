"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');


module.exports = {
    stringifyList: stringifyList
};


function stringifyList(list) {
    var table = list.map(printedData);
    var maxLengths = [];
    for (var key in table) {
      for (var i in table[key]) {
        maxLengths[i] = Math.max(maxLengths[i] || 0, realLength(table[key][i]));
      }
    }
    // Another way to calculate maxLength; more fun, but heckish as hell. This is here as an example for the curious reader:
    // var maxLengths = table[0].map(function(v,columnIndex) { return table.reduce(function(max, row) { return Math.max(max, realLength(row[columnIndex])); }, 0); });
    return table.map(function(row) {
      return row.map(function(val,i) {
        return pad(val,maxLengths[i]);
      }).join(' ');
    }).join('\n');
}

////////////////////////////////////////////////////////////////////////////////


function foldersStatus(folder) {
  if (fs.existsSync(folder)) {
    return 'exists';
  } else {
    return 'missing';
  }
}

function printedData(link) {
  return [link.id+":", cliColorFolder(link.file), "-->", cliColorFolder(link.mountpoint)];
}

function realLength(str) {
  return str.replace(/.\[[0-9;]+m/g,'').length; //This removes color codes;
}

function pad(str, len) {
  for (var cur = realLength(str); cur < len; cur++) {
    str += '.';
  }
  return str;
}

function cliColorFolder(folder) {
  var color = foldersStatus(folder);
  if (color == 'exists') {
    return clc.green(folder);
  } else if (color == 'missing') {
    return clc.xterm(52)(folder);
  } else {
    return folder;
  }
}








