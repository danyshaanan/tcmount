"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');
var tcUtils = rek('tcUtils')

module.exports = {
  getMountedDataAndPrintList: getMountedDataAndPrintList,
  printList: printList,
  showSystemData: showSystemData
};

var mountedData;

function getMountedDataAndPrintList(list) {
  tcUtils.checkForTrueCrypt();
  tcUtils.getMountedData(function(err, files, mountpoints) {
    if (err) {
      console.log(clc.red('error getting mounted information'), err);
    } else {
      mountedData = files.concat(mountpoints);
    }
    printList(list);
  })
}

function printList(list) {
  var table = list.map(printedData);
  var maxLengths = table.reduce(function(prev, curr) {
    return curr.map(function(v,i) { return Math.max(v.length, prev ? prev[i] : 0) });
  }, null);
  var result = table.map(function(row) {
    return row.map(function(val,i) {
      return pad(val, maxLengths[i], '.');
    }).join(' ');
  }).join('\n');
  console.log(result);
}

function showSystemData() {
  tcUtils.checkForTrueCrypt();
  tcUtils.getMountedData(function(err, files, mountpoints) {
    if (err) {
      console.log(clc.red('error getting mounted information.\n') + err);
    } else {
      //TODO: change to cliColorPath after getting mounted data correctly
      var list = files.map(function(v, i) {
        return { id: "?", file: clc.green(files[i]), mountpoint: clc.green(mountpoints[i]) }
      });
      printList(list);
    }
  });
}
////////////////////////////////////////////////////////////////////////////////

/////// Private ///////////////////

var PathStatus = {
  UNKNOWN: 'unknown',
  MISSING: 'missing',
  MOUNTED: 'mounted',
  EXISTS: 'exists'
}

//////////

function ProcessedString(str, funcArray) {
  this.str = str;
  this.length = this.str.length;
  this.funcArray = (funcArray instanceof Array) ? funcArray : [funcArray];
}

ProcessedString.prototype.toString = function() {
  // console.log(this.str, this.funcArray[0]("A"));
  return this.funcArray.filter(Boolean).reduce(function(prev, curr) { return curr(prev); }, this.str);
}

ProcessedString.prototype.replace = function() {
  return this.str.replace.bind(this.string);
}

////////////////////////////////////////////////////////////////////////////////

function pathStatus(path) {
  if (!mountedData)                  return PathStatus.UNKNOWN;
  if (~mountedData.indexOf(path))    return PathStatus.MOUNTED;
  if (fs.existsSync(path))           return PathStatus.EXISTS;
  else                               return PathStatus.MISSING;
}

function printedData(link) {
  return [link.id+":", cliColorPath(link.file), "-->", cliColorPath(link.mountpoint)];
}

function pad(path, len, char) {
  return path + multiplyString(char[0], len - path.length);
}

function multiplyString(str,n) {
  return Array.apply(null, Array(n)).map(function(){return str;}).join('');
}

function cliColorPath(path) {
  return new ProcessedString(path, pathColorFunction(path));
}

function pathColorFunction(path) {
  var status = pathStatus(path);
  if (status == PathStatus.UNKNOWN) return clc.white;
  if (status == PathStatus.MOUNTED) return clc.green;
  if (status == PathStatus.EXISTS) return clc.yellow;
  if (status == PathStatus.MISSING) return clc.xterm(52);
}







