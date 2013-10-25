"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');
var exec = require('child_process').exec


module.exports = {
    getMountedDataAndPrintList: getMountedDataAndPrintList,
    printList: printList
};

var mountedData;

function getMountedDataAndPrintList(list) {
    exec('truecrypt -t -l', function(err, stdout, stderr) {
      if (err) {
        // console.log(clc.red('error getting mounted information'), err);
        mountedData = null;
      } else {
        // console.log('stdout data:', stdout);
        // console.log('stderr data:', stderr);
        mountedData = stdout;
      }
      printList(list);
    });
}

function printList(list) {
    var table = list.map(printedData);
    var maxLengths = [];
    for (var key in table) {
      for (var i in table[key]) {
        maxLengths[i] = Math.max(maxLengths[i] || 0, realLength(table[key][i]));
      }
    }
    // Another way to calculate maxLength; more fun, but heckish as hell. This is here as an example for the curious reader:
    // var maxLengths = table[0].map(function(v,columnIndex) { return table.reduce(function(max, row) { return Math.max(max, realLength(row[columnIndex])); }, 0); });
    var result = table.map(function(row) {
      return row.map(function(val,i) {
        return pad(val,maxLengths[i]);
      }).join(' ');
    }).join('\n');

    console.log(result);
}

////////////////////////////////////////////////////////////////////////////////


function foldersStatus(folder) {
  if (!mountedData) {
    return 'unknown';
  } else if (~mountedData.indexOf(folder)) {
    return 'mounted'
  } else if (fs.existsSync(folder)) {
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
  var status = foldersStatus(folder);
  if (status == 'unknown') {
    return clc.white(folder);
  } else if (status == 'mounted') {
    return clc.green(folder);
  } else if (status == 'exists') {
    return clc.yellow(folder);
  } else if (status == 'missing') {
    return clc.xterm(52)(folder);
  } else {
    return folder;
  }
}








