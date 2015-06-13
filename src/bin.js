#!/usr/bin/env node

/* eslint no-multi-spaces:0 */

'use strict'

var qp = require('./main.js')
var cli = require('./lib/cli.js')

var helpMessage = require('fs').readFileSync(__filename.replace(/\/[^\/]+$/, '') + '/help.txt')
  .toString()
  .replace(/BIN/g, Object.keys(require('../package.json').bin)[0])
  .replace(/RESERVED/, Object.keys(qp.reserved).map(function(c) { return '    ' + c + ' -> ~/' + qp.reserved[c]}).join('\n'))



if (cli.targets.length === 2)  qp.freeMount(cli.targets[0], cli.targets[1])
else if (cli.v)                console.log(require('./package.json').version)
else if (cli.h)                console.log(helpMessage)
else if (cli.l || !cli.target) qp.list()
else if (cli.u)                qp.unmount(cli.target)
else                           qp.mount(cli.target)
