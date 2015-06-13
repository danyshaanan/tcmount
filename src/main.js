'use strict'

var fs = require('fs')
var shell = require('./lib/shell.js')

var userHome = process.env.HOME || process.env.USERPROFILE

var reserved = {
  ssh: '.ssh',
  chrome: 'Library/Application Support/Google/Chrome',
  chromium: 'Library/Application Support/Chromium'
}

function entityExists(entity, commandPrefix, path) {
  if (fs.existsSync(path)) return path
  console.log('Target ' + entity + ' does not exist! You can create it with "' + commandPrefix + ' ' + path + '"')
  process.exit()
}

function getFile(name) {
  return entityExists('file', 'truecrypt -t -c', userHome + '/.tc/' + name + '.tc')
}

function getDir(name) {
  return entityExists('directory', 'mkdir', userHome + '/' + (reserved[name] || name))
}

module.exports = {
  reserved: reserved,
  mount: function mount(name) {
    shell('truecrypt', ['-t', '-k=', '--protect-hidden=no', getFile(name), getDir(name)], process.exit)
  },
  unmount: function unmount(name) {
    shell('truecrypt', ['-t', '-d', getDir(name)], process.exit)
  },
  list: function list() {
    console.log('Mounted volumes:')
    shell('truecrypt', ['-t', '-l'], process.exit)
  }
}
