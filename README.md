# nsyrc
## A command line tool for easily defining and maintaining rsync backups
nsyrc lets you save links between source and target folders, and rsync easily between them.

### Installation
```bash
$ npm install -g nsyrc
```

### Usage

Create a link between a source folder and a target folder with `nsyrc link`:
```bash
$ nsyrc link from ~/aFolderInYourHome/ to ~/anotherFolderInYourHome/
Source: /Users/dany/aFolderInYourHome/
Target: /Users/dany/anotherFolderInYourHome/
Link created with id #8
```
A link will be created only if the folders exists, or are remote folders, like `user@example.com:~/files/`


View existing links with `nsyrc show` or just with `nsyrc`:
```bash
$ nsyrc
1: /Users/dany/wip/.................. --> server:/home/dany/backups/wip/............ (a few seconds ago)
2: /Users/dany/git/.................. --> server:/home/dany/backups/git/............ (18 hours ago).....
3: dany@server:~/.................... --> /Users/dany/backups/server_users/dany/.... (4 days ago).......
4: server:~/......................... --> /Users/dany/backups/server_users/ec2-user/ (8 days ago).......
5: /Users/dany/files/................ --> server:/home/dany/backups/files/.......... (a day ago)........
6: /Users/dany/files/................ --> /Volumes/1tbdrive/backups/files........... (a day ago)........
7: /Volumes/1tbdrive/backups/........ --> /Volumes/2tbdrive/backups/................ (a month ago)......
8: /Users/username/aFolderInYourHome/ --> /Users/username/anotherFolderInYourHome/.. (Never synced).....
```


Execute a link with `nsyrc run [id]`
```bash
$ nsyrc run 8
rsync /Users/dany/aFolderInYourHome/ /Users/dany/anotherFolderInYourHome/ -Phavyx --delete-after --dry-run
Execute command? :  [no/YES]
```
After the dry run will complete, you will be prompt to execute the command without --dry-run.


Remove a link with `nsyrc unlink [id]`:
```bash
$ nsyrc unlink 8
Removed id #8
```


### Example

![Screen shot of a result of `nsyrc show`](doc/nsyrc_example.png?raw=true)

This is the result of running `nsyrc` (same as `nsyrc show`) with [this .nsyrc file](./doc/dot.nsyrc_example). Each row represents a link. The padded columns are, from left to right:
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

#### A full cycle of `nsyrc show` -> `nsyrc link` -> `nsyrc run` -> `nsyrc show`:
![nsyrc show, link run, and show again](doc/nsyrc_process_example.png?raw=true)


### Info
* The links data is saved as json in ~/.nsyrc
* The default for the dry-run prompt is YES, while the default of the wet-run prompt is NO.
* Unlinked links are sent into a trash can, which can be emptied with **nsyrc empty** or recovered only by editing ~/.nsyrc (for now).


### TODOs

#### Fixes
* Write tests, then refactor some more
* Sanitize command args before running with .replace(/[^\-a-zA-Z0-9]/g,'')

#### Features
* Make periods of time by which last-synced is colored configurable
* Add an **nsyrc pull/push** command which will run the link which has `pwd` as target/source
* Add option to set specific rsync flags for specific links
* Add a flag to skip prompt?
* Consider implementing **nsryc restore** for restoring unlinked links from the trash
* Think of some kind of grouping or priority for links. At a large amount it's getting messy
* Add a command to reassign ids in ~/.nsyrc