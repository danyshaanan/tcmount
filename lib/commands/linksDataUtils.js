"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');
var path = require('path');
var moment = require('moment');

var getCwd = rek('getCwd');


module.exports = {
    format: format,
    varify: varify,
    stringify: stringify,
    stringifyList: stringifyList
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
    return printedData(link).join(' ');
}

function printedData(link) {
  return [link.id+":", colorFolder(link.source), "-->", colorFolder(link.target), lastUpdated(link)];
}

function stringifyList(list) {
    var table = list.map(function(link) {
        return printedData(link);
    });
    var maxLengths = [];
    for (var key in table) {
      for (var i in table[key]) {
        maxLengths[i] = Math.max(maxLengths[i] || 0, table[key][i].length);
      }
    }
    return table.map(function(row) {
      return row.map(function(val,i) {
        return pad(val,maxLengths[i]);
      }).join(' ');
    }).join('\n');
}

////////////////////////////////////////////////////////////////////////////////

function pad(str, len) {
  str = str.toString();
  while (str.length < len) {
    str += '.';
  }
  return str;
}

function lastUpdated(link) {
    if (!link.lastSynced) {
      return clc.red("(Never synced)");
    }
    var syncedMoment = moment(link.lastSynced);
    var secondsAgo = moment().diff(syncedMoment) / 1000;
    var timeAgo = ["(",syncedMoment.fromNow(),")"].join("");

    if (secondsAgo > 60*60*24*7) { //TODO: this time period (week) should be configurable.
      return clc.red(timeAgo);
    } else if (secondsAgo > 60*60*24) { //TODO: this time period (day) should be configurable.
      return clc.yellow(timeAgo);
    }
    return timeAgo;
}

function formatFolder(folder) {
    if (remoteFolder(folder)) {
      if (folder[folder.length-1] != '/') {
        folder += '/';
      }
      return folder;
    }
    return path.resolve(folder) + '/';
}

function varifyFolder(folder) {
    return folder && (folder[0] == '/' || remoteFolder(folder)) && folder[folder.length-1] == '/' && folderExists(folder);
}

function folderExists(folder) {
  return remoteFolder(folder) || fs.existsSync(folder);
}

function remoteFolder(folder) {
  return !!folder.match(/[^\/]+:/);
}

function colorFolder(folder) {
  if (remoteFolder(folder)) {
    return clc.yellow(folder);
  } else if (fs.existsSync(folder)) {
    return clc.green(folder);
  } else {
    return clc.red(folder);
  }
}



