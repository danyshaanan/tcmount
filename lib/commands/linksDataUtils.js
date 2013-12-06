"use strict";

var clc = require('cli-color');
var fs = require('fs');
var rek = require('rekuire');
var exec = require('child_process').exec


module.exports = {
  getMountedDataAndPrintList: getMountedDataAndPrintList,
  printList: printList,
  showSystemData: showSystemData
};

var mountedData;

function getMountedDataAndPrintList(list) {
  checkForTrueCrypt();
  exec('truecrypt -t -l -v', function(err, stdout, stderr) { //TODO: Move system calls outside this class.
    if (err) {
      if (~stderr.indexOf('No volumes mounted.')) {
        mountedData = []; // command failed, but we got the info we wanted.
      } else {
        console.log(clc.red('error getting mounted information'), err);
        mountedData = null;
      }
    } else {
      // console.log('stdout data:', stdout);
      // console.log('stderr data:', stderr);
      var output = stdout.split('\n');
      var files = output.filterByPrefix('Volume: ');
      var mountpoints = output.filterByPrefix('Mount Directory: ');
      mountedData = files.concat(mountpoints);
    }
    printList(list);
  });
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
  checkForTrueCrypt();
  exec('truecrypt -t -l -v', function(err, stdout, stderr) { //TODO: Move system calls outside this class.
    if (err || stderr) {
      console.log(clc.red('error getting mounted information.\n') + err);
    } else {
      var output = stdout.split('\n');
      var files = output.filterByPrefix('Volume: ');
      var mountpoints = output.filterByPrefix('Mount Directory: ');

      if (files.length != mountpoints.length) {
        console.log(clc.red('error getting mounted information.\n'));
      } else {
        //TODO: change to cliColorPath after getting mounted data correctly
        var list = files.map(function(v, i) {
          return { id: "?", file: clc.green(files[i]), mountpoint: clc.green(mountpoints[i]) }
        });
        printList(list);
      }
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

//////////

Array.prototype.filterByPrefix = function(prefix) {
  return this.filter(function(field) { return field.indexOf(prefix) == 0; }).map(function(v) { return v.replace(prefix,'')});

}

////////////////////////////////////////////////////////////////////////////////

function checkForTrueCrypt() {
  exec('which truecrypt', function(err, stdout, stderr) {
    if (err) {
      console.log(clc.red('You do not seem to have truecrypt available in the path!'));
      console.log("If you are using OSX, you might want to symlink truecrypt into the /usr/local/bin :");
      console.log(clc.yellow("ln -s /Applications/TrueCrypt.app/Contents/MacOS/TrueCrypt /usr/local/bin/truecrypt"));
      console.log("If you are using Linux, it probably means you do not have truecrypt installed.");
      console.log("Aborting...");
      process.exit();
    }
  });
}

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







