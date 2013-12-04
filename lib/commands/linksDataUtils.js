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

function showSystemData() {
    checkForTrueCrypt();
    var output;
    exec('truecrypt -t -l', function(err, stdout, stderr) { //TODO: Move system calls outside this class.
      if (err || stderr) {
        output = clc.red('error getting mounted information.\n') + err;
      } else {
        output =
          stdout.split('\n').filter(Boolean).map(function(line) {
            var words = line.split(' ');

            // TODO: pad this, add original id, or ?! for split link, or XX for not listed.
            // fitting pairs are green, non-pairs are yellow, and forign are red.
            // (after adjusting this file as per nsyrc)

            return clc.green(words[1]) + ' ---> ' + clc.green(words[3]);
          }).join('\n');
      }
      console.log(output);
    });
}

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
        var prefix = ['Volume: ', 'Mount Directory: '];
        mountedData =
          stdout
          .split('\n')
          .filter(function(v) { return v.indexOf(prefix[0]) == 0 || v.indexOf(prefix[1]) == 0 })
          .map(function(v) { return v.replace(prefix[0],'').replace(prefix[1],'')});
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

function realLength(str) { //TODO: get rid of this as per nsyrc
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








