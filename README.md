:x::x::x::x: NOTICE :x::x::x::x::x:

tcmount 1.0.0 was totally rewritten
to favor convention over personalization.
It no longer manages a personal settings files,
and all dependencies have been removed.
Please read below (or use the previous release with `npm i -g tcmount@0.1.0`).

:x::x::x::x::x::x::x::x::x::x::x::x:

# tcmount

[![Build Status](https://travis-ci.org/danyshaanan/tcmount.png)](https://travis-ci.org/danyshaanan/tcmount)
[![NPM Version](https://img.shields.io/npm/v/tcmount.svg?style=flat)](https://npmjs.org/package/tcmount)
[![License](http://img.shields.io/npm/l/tcmount.svg?style=flat)](LICENSE)
[![Dependency Status](https://david-dm.org/danyshaanan/tcmount.svg)](https://david-dm.org/danyshaanan/tcmount)
[![devDependency Status](https://david-dm.org/danyshaanan/tcmount/dev-status.svg)](https://david-dm.org/danyshaanan/tcmount#info=devDependencies)
#### A command line tool for mounting and dismounting TrueCrypt volumes

* * *
### Installation
```bash
$ npm install -g tcmount
```

* * *
### Usage

`tcmount <name>` mounts `~/.tc/<name>.tc` onto `~/<name>`, or `~/.tc/<reservedname>.tc` to a preset path. One such reserved name is `chrome` which is mounted on `~/Library/Application Support/Google/Chrome`.

Other reserved names can by seen with `tcmount -h`.

If you need additional presets, open an issue or a pull request and I'll either add it or implement a way to customize presets.


`tcmount -u <name>` unmounts `~/<name>` (or the reserved path).

`tcmount -l` lists currently mounted volumes.

`tcmount -h` prints the help screen.

`tcmount -v` prints the version number.

* * *
### Info
* Truecrypt is required
* No support for key files or hidden volumes.
* Not tested in Linux.

* * *
### Notes

```bash
alias tm='tcmount'
alias tu='tcmount -u'
```

* * *
### Feedback
* [Open an issue](https://github.com/danyshaanan/tcmount/issues).
* Mail me at an address that can be found on my [NPM](https://www.npmjs.org/~danyshaanan)/[Github](https://github.com/danyshaanan)/[Personal](http://danyshaanan.com/) page.
