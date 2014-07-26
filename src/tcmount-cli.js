#!/usr/bin/env node

'use strict';

var cli = require('commander');
var chalk = require('chalk');
var rek = require('rekuire');
var version = rek('package.json').version;

var tcmount_cli = rek('tcmount');

cli
  .version(version)
  .usage('[<file> | <file> <mountpoint> | <mountpoint> | -m [id] ]') //TODO: Sort out
  .option('-l, --link', 'create a link from <file> to <mountpoint>')
  .option('-m, --mount', 'mount by file, mountpoint, or link id')
  // .option('-g, --go <id>', 'cd into link's mountpoint by id')
  .option('-u, --unmount', 'unmount by file, mountpoint, or link id')
  .option('-t, --trash <id>', 'delete a link by id', parseInt)
  .option('-d, --data', 'get system data on all mounted volumes (truecrypt -t -l)')
  .option('-o, --open <id>', 'open link target folder', parseInt)
  .option('--no-color', 'disable color in output') //handled by chalk. Prevents commander's "unknown option"
  .parse(process.argv);


var targets = process.argv.slice(2).filter(function(v) { return v.indexOf('-') !== 0; });

if (targets.length > 2) {
  return console.log(chalk.red('Too many arguments!! Besides flags, there can\'t be more than two.'));
}

if (cli.open) {
  tcmount_cli.openLink(targets);
} else if (cli.link) {
  tcmount_cli.createLink(targets);
} else if (cli.trash) {
  tcmount_cli.trash(cli.trash);
} else if (cli.unmount) {
  tcmount_cli.unmount(targets);
// } else if (cli.go) {
  // tcmount_cli.go(cli.go);
} else if (cli.mount || targets.length > 0) {
  tcmount_cli.mount(targets);
} else if (cli.data) {
  tcmount_cli.showSystemData();
} else {
  tcmount_cli.show();
}
