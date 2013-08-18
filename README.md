# nsyrc
## A command line tool for easily defining and maintaining rsync backups
nsyrc lets you save links between source and target folders, and rsync easily between them.

### Installation
```bash
$ npm install -g nsyrc
```

### Usage

`nsyrc show` or just `nsyrc` shows you the list of your defined links.
Here is the result of running `nsyrc` with [this .nsyrc file](https://github.com/danyshaanan/nsyrc/blob/master/doc/dot.nsyrc_example):

![Screen shot of a result of `nsyrc show`](https://raw.github.com/danyshaanan/nsyrc/master/doc/nsyrc_example.png?raw=true)

Each row represents a link. The padded columns are, from left to right:

* id - used with `nsyrc run` or `nsyrc unlink`
* Source folder, Target folder, which are marked with these colors:
 * Green: local existing folder
 * Yellow: remote folders, which are not checked for existance
 * Red: local non-existing folders, probably folders on removeable media
* How long ago it was last synced, which is marked with these colors that represent predefined periods of time:
 * White: less than a day
 * Yellow: more than a day and less than a week
 * Red: more than a week

A pending feature will enable the user to set those period of time.


`nsyrc link` or `nsyrc link from FOLDER1 to FOLDER2` creates a new link.

`nsyrc run ID` prompts the user to run the link with --dry-run first, and then without.

`nsyrc unlink ID` trashes a link. `nsyrc empty` empties the trash. The trash is currently only accessible through opening ~/.nsyrc

Here is the creation and execution of a link, starting with an empty .nsyrc file:

![nsyrc show, link run, and show again](https://raw.github.com/danyshaanan/nsyrc/master/doc/nsyrc_process_example.png?raw=true)


### Info
* The links data is saved as json in ~/.nsyrc
* The default for the dry-run prompt is YES, while the default of the wet-run prompt is NO.


### TODOs

#### Fixes

* Write tests, then refactor some more
* Check that rsync exists before running it, or better yet, include a private version of rsync inside the package
* Sanitize command args before running with .replace(/[^\-a-zA-Z0-9]/g,'')

#### Features

* Make periods of time by which last-synced is colored configurable
* Add an **nsyrc pull/push** command which will run the link which has `pwd` as target/source
* Add option to set specific rsync flags for specific links
* Add a flag to skip prompt?
* Consider implementing **nsryc restore** for restoring unlinked links from the trash
* Think of some kind of grouping or priority for links. At a large amount it's getting messy
* Add a command to reassign ids in ~/.nsyrc
* Create a github page

### Disclaimer

While nsyrc tries to distance the user from the dangers of using rsync directly, it is still a program that runs rsync commands, and that was written by a human being, and no one can guarantee that it is devoid of bugs or unexpected behaviors, therefore use this software at your own risk.
