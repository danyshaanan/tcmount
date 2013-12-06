"use strict";

var clc = require('cli-color');
var exec = require('child_process').exec

module.exports = {
  getMountedData: getMountedData,
  checkForTrueCrypt: checkForTrueCrypt
};

////////////////////////////////////////////////////////////////////////////////

function getMountedData(callback) { //TODO: Move system calls outside this class.
  checkForTrueCrypt();
  exec('truecrypt -t -l -v', function(err, stdout, stderr) {
    if (err) {
      if (~stderr.indexOf('No volumes mounted.')) {
        callback(null, [], []);
      } else {
        callback({ error: "truecrypt -t -l -v failed." });
      }
    } else {
      var output = stdout.split('\n');
      var files = output.filterByPrefix('Volume: ');
      var mountpoints = output.filterByPrefix('Mount Directory: ');
      if (files.length != mountpoints.length) {
        callback({ error: "different number of files and mountpoints." });
      } else {
        callback(null, files, mountpoints);
      }
    }
  });
}

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


//////////

Array.prototype.filterByPrefix = function(prefix) {
  return this.filter(function(field) { return field.indexOf(prefix) == 0; }).map(function(v) { return v.replace(prefix,'')});
}
