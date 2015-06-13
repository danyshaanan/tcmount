'use strict'

module.exports = (function() {
  var argv = process.argv.slice(2)

  var cli = {
    flags: argv.filter(function(arg) { return arg[0] === '-' }).join('').replace(/[^a-zA-Z]/g, ''),
    targets: argv.filter(function(arg) { return arg[0] !== '-' })
  }

  cli.target = cli.targets[0]

  cli.flags.split('').forEach(function(char) { cli[char] = true })

  return cli
}())
