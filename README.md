# tcmount
## A command line tool for mounting and dismounting TrueCrypt volumes
tcmount lets you save links between truecrypt volumes and mount points, and mount and dismount them easily.

* * *
### Installation
```bash
$ npm install -g tcmount
```
* * *
### Usage

`tcmount` shows you the list of your defined links, including their ids.
<!-- Here is the result of running `tcmount` with [this .tcmount file](https://github.com/danyshaanan/tcmount/blob/master/doc/dot.tcmount_example): -->

<!-- ![Screen shot of a result of `tcmount`](https://raw.github.com/danyshaanan/tcmount/master/doc/tcmount_example.png?raw=true) -->

`tcmount <file> <mountpoint>` will mount the file onto the mountpoint.

`tcmount -l <file> <mountpoint>` will create a link from the file to the mountpoint.

`tcmount <id>` will mount the link with that id.

`tcmount <filename or mountpoint or another string>` will search your links for a fitting one, and mount it.

`tcmount -u <id>` will unmount the link with that id.

`tcmount -u <filename or mountpoint or another string>` will search your links for a fitting one, and unmount it.

`tcmount -t <id>` will remove the link with that id.

* * *
### Info
* The links data is saved as json in ~/.tcmount
* No support for key files or hidden volumes.
* Not tested in Linux.

* * *
### TODOs
* Check and show which links are mounted.
