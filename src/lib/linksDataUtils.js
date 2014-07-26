'use strict';

var chalk = require('chalk');
var fs = require('fs');
var rek = require('rekuire');
var tcUtils = rek('tcUtils');
var columnify = require('columnify');

var mountedData;

////////////////////////////////////////////////////////////////////////////////

var PathStatus = {
  UNKNOWN: 'unknown',
  MISSING: 'missing',
  MOUNTED: 'mounted',
  EXISTS: 'exists'
};

////////////////////////////////////////////////////////////////////////////////

function ProcessedString(str, funcArray) {
  this.str = str;
  this.length = this.str.length;
  this.funcArray = (funcArray instanceof Array) ? funcArray : [funcArray];
}

ProcessedString.prototype.toString = function() {
  // console.log(this.str, this.funcArray[0]('A'));
  return this.funcArray.filter(Boolean).reduce(function(prev, curr) { return curr(prev); }, this.str);
};

ProcessedString.prototype.replace = function() {
  return this.str.replace.bind(this.string);
};

////////////////////////////////////////////////////////////////////////////////

function pathStatus(path) {
  if (!mountedData)                  return PathStatus.UNKNOWN;
  if (~mountedData.indexOf(path))    return PathStatus.MOUNTED;
  if (fs.existsSync(path))           return PathStatus.EXISTS;
  else                               return PathStatus.MISSING;
}

function pathColorFunction(path) {
  var status = pathStatus(path);
  if (status == PathStatus.UNKNOWN) return chalk.white;
  if (status == PathStatus.MOUNTED) return chalk.green;
  if (status == PathStatus.EXISTS) return chalk.yellow;
  if (status == PathStatus.MISSING) return chalk.gray;
}

function cliColorPath(path) {
  return new ProcessedString(path, pathColorFunction(path));
}

////////////////////////////////////////////////////////////////////////////////

function printList(list) {
  var columns = list.map(function(link) {
    return {
      'id': link.id + ':',
      'file': cliColorPath(link.file),
      '-->': '-->',
      'mountpoint': cliColorPath(link.mountpoint)
    };
  });

  console.log(columnify(columns, { paddingChr: '.' }));
}

function getMountedDataAndPrintList(list) {
  tcUtils.checkForTrueCrypt();
  tcUtils.getMountedData(function(err, files, mountpoints) {
    if (err) {
      console.log(chalk.red('error getting mounted information'), err);
    } else {
      mountedData = files.concat(mountpoints);
    }
    printList(list);
  });
}

function showSystemData() {
  tcUtils.checkForTrueCrypt();
  tcUtils.getMountedData(function(err, files, mountpoints) {
    if (err) {
      console.log(chalk.red('error getting mounted information.\n') + err);
    } else {
      //TODO: change to cliColorPath after getting mounted data correctly
      var list = files.map(function(v, i) {
        return { id: '?', file: chalk.green(files[i]), mountpoint: chalk.green(mountpoints[i]) };
      });
      printList(list);
    }
  });
}

////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getMountedDataAndPrintList: getMountedDataAndPrintList,
  printList: printList,
  showSystemData: showSystemData
};
