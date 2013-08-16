nsyrc
=====

# nsyrc - A command line tool for easily defining and maintaining rsync backups

nsyrc lets you save links between source and target folders, and rsync easily between them.

## Installation

  $ npm install -g nsyrc

## Usage

Creating and viewing links:

```bash
nsyrc show
cd temp
nsyrc link from oneFolder/ to anotherFolder/
nsyrc link from ~/aFolderInYourHome/ to ~/anotherFolderInYourHome/
nsyrc show
```
31 : /Users/username/temp/oneFolder/ ---> /Users/username/temp/anotherFolder/
32 : /Users/username/aFolderInYourHome/ ---> /Users/username/anotherFolderInYourHome/

Output colored text:

```javascript
console.log(clc.red('Text in red'));
```

Styles can be mixed:

```javascript
console.log(clc.red.bgWhite.underline('Underlined red text on white background.'));
```

Styled text can be mixed with unstyled:

```javascript



TODO

* Implement rsync.run()
* Use promises for prompt actions
* Write proper readme
* Write tests before refactoring
* Refactor
* Add parseInt coercion to cli input when valid