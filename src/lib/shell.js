'use strict';

var spawn = require('child_process').spawn;

module.exports = function shell(cmd, opts, callback) {
  process.stdin.pause();
  var p = spawn(cmd, opts, { stdio: 'inherit' });
  return p.on('exit', function() {
    process.stdin.resume();
    return callback();
  });
};
