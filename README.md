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
Link created.
```

View existing links with **nsyrc show** or just with **nsyrc**:
```bash
$ nsyrc
1 : /Users/username/aFolderInYourHome/ ---> /Users/username/anotherFolderInYourHome/
```

Execute a link with **nsyrc run [id]**:
```bash
$ nsyrc run 1
rsync /Users/dany/aFolderInYourHome/ /Users/dany/anotherFolderInYourHome/ -Phavyx --delete-after --dry-run
Execute command? :  [N/y]
```
After the dry run will complete, you will be prompt to execute the command without --dry-run.

Remove a link with **nsyrc unlink [id]**:
```bash
$ nsyrc unlink 1
Removed id #1
```

### Info
The links data is saved as json in ~/.nsyrc

### TODOs

* Add last-synced field to links
* Add an **nsyrc pull/push** command which will run the link which has `pwd` as target/source
* Add option to set specific rsync flags for specific links
* Add flag to skip dry-run and/or prompt
* Write tests