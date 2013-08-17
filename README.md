# nsyrc
## A command line tool for easily defining and maintaining rsync backups
nsyrc lets you save links between source and target folders, and rsync easily between them.

### Installation
```bash
$ npm install -g nsyrc
```

### Usage
Create a link between a source folder and a target folder with **nsyrc link**:

```bash
$ nsyrc link from ~/aFolderInYourHome/ to ~/anotherFolderInYourHome/
Source: /Users/dany/aFolderInYourHome/
Target: /Users/dany/anotherFolderInYourHome/
Link created with id #1
```

View existing links with **nsyrc show** or just with **nsyrc**:
```bash
$ nsyrc
1 : /Users/username/aFolderInYourHome/ ---> /Users/username/anotherFolderInYourHome/ (Never synced)
```

Execute a link with **nsyrc run [id]**:
```bash
$ nsyrc run 1
rsync /Users/dany/aFolderInYourHome/ /Users/dany/anotherFolderInYourHome/ -Phavyx --delete-after --dry-run
Execute command? :  [no/YES]
```
After the dry run will complete, you will be prompt to execute the command without --dry-run.

Remove a link with **nsyrc unlink [id]**:
```bash
$ nsyrc unlink 1
Removed id #1
```
### Example

![Screen shot of a result of `nsyrc show`](doc/nsyrc_example.png?raw=true)

This is the result of running `nsyrc` with [this .nsyrc file](./doc/dot.nsyrc_example).

Each row represent a link. The padded coluoms are, from left to right:
* id - used with `nsyrc run` or `nsyrc unlink`
* Source folder
* Target folder
* How long ago was it last synced

Folder colors:
* Green: local existing folder
* Yellow: remote folders, which are not checked for existance
* Red: local non-existing folders, probably folders on removeable media

How-Long-Ago colors represent predefined periods of time:
* White: less than a day
* Yellow: more than a day and less than a week
* Red: more than a week
A pending feature will enable the user to set those period of time.


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