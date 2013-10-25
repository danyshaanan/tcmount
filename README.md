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

`tcmount` shows you the list of your defined links.
<!-- Here is the result of running `tcmount` with [this .tcmount file](https://github.com/danyshaanan/tcmount/blob/master/doc/dot.tcmount_example): -->

<!-- ![Screen shot of a result of `tcmount show`](https://raw.github.com/danyshaanan/tcmount/master/doc/tcmount_example.png?raw=true) -->

<!-- Each row represents a link. The padded columns are, from left to right: -->

<!-- * id - used with `tcmount run` or `tcmount unlink`
* Source folder, Target folder, which are marked with these colors:
 * Green: local existing folder
 * Yellow: remote folders, which are not checked for existance
 * Red: local non-existing folders, probably folders on removeable media
* How long ago it was last synced, which is marked with these colors that represent predefined periods of time:
 * White: less than a day
 * Yellow: more than a day and less than a week
 * Red: more than a week -->

<!-- A pending feature will enable the user to set those period of time. -->


`tcmount <file> <mountpoint>` will mount the file onto the mountpoint. use the -l flag to also create a link for that pair.

`tcmount <file>` will mount the file if there is a link that includes it, or ask the user for a mount point.

`tcmount -u <file>` or `tcmount -u <mountpoint>` will unmount the pair.

`tcmount -t <file>` or `tcmount -f <mountpoint>` will remove the link for that pair.

<!-- Here is the creation and execution of a link, starting with an empty .tcmount file: -->

<!-- ![tcmount show, link run, and show again](https://raw.github.com/danyshaanan/tcmount/master/doc/tcmount_process_example.png?raw=true) -->

* * *
### Info
* The links data is saved as json in ~/.tcmount

<!-- * * *
### TODOs

* Write tests
* Create a github page
* [Close open issues](https://github.com/danyshaanan/tcmount/issues) -->
