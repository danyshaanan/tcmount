"use strict";

var rek = require('rekuire');
var linksData = rek('linksData');
var link = rek('Link').link;
var linksDataUtils = rek('linksDataUtils');

module.exports = {
  start: start
};

function start(initData) {
  console.log("Web gui not implemented yet!");
  //implement the server here.

  var express = require('express');
  var app = express();
  var http = require('http');
  var server = http.createServer(app);
  var io = require('socket.io').listen(server);

  app.configure(function(){
    app.use(express.static(__dirname + '/http'));
  });

  server.listen(8080);
  console.log("server started");

  io.sockets.on('connection', function(socket) {
    socket.on('getVersion', function() {
      socket.emit('version', { version: initData.version });
    });
    socket.on('getLinks', function() {
      socket.emit('links', { table: linksDataUtils.tablifyList(linksData.all()) });
    });
    socket.on('dry', function() {
      console.log("Dry run not implemented yet.");
    });
    socket.on('wet', function() {
      console.log("Wet run not implemented yet.");
    });
    socket.on('exit', function() {
      process.exit();
    });

  });

  require('open')('http://localhost:8080/nsyrc.htm', function (err) {
    if (err) throw err;
  });


}

//////////////////////////////////////////////////////////////////////////////////////////////////

// function createLink(source, target) {
//     if (source && target) {
//         console.log(clc.green("Source: " + source));
//         console.log(clc.green("Target: " + target));
//         linksData.add({ source: source, target: target });
//         return;
//     }
//     read({prompt: "Source:"}, function(error, source, isDefault) {
//         if (error) {
//             return console.log(clc.red("Link not created - Error handling input!"));
//         }
//         console.log(clc.green("Source: " + source));
//         read({prompt: "Target:"}, function(error, target, isDefault) {
//             if (error) {
//                 return console.log(clc.red("Link not created - Error handling input!"));
//             }
//             console.log(clc.green("Target: " + target));
//             linksData.add({ source: source, target: target });
//         });
//     });
// }

// function unlink(id) {
//     if (typeof id == 'number' || typeof id == 'string') {
//         var res = linksData.removeById(parseInt(id));
//         if (!res) {
//             return console.log(clc.red("Invalid id or another problem. (id: " + id + ")."));
//         }
//         return console.log(clc.green("Removed id #" + id));
//     } else {
//         show();
//         read({prompt: "Which link do you want to unlink?"}, function(error, input, isDefault) {
//             var id = parseInt(input);
//             if (error || (typeof id != 'number') || !id) {
//                 return console.log(clc.red("Error handling input, or input invalid!"));
//             }
//             unlink(id);
//         });
//     }
// }

// function emptyTrash() {
//     linksData.emptyTrash();
//     console.log(clc.green("Unlinked links removed from trash."));
// }

// function show() {
//     var all = linksData.all();
//     if (all.length == 0) {
//         console.log(clc.yellow("There aren't any links defined yet, try something like this:"));
//         console.log(clc.green("nsyrc link from ~/thisfolder/ to ~/thatfolder/"));
//         return;
//     }
//     // for (var i in all) {
//         // console.log(linksDataUtils.stringify(all[i]));
//     // }
//     console.log(linksDataUtils.stringifyList(all));
// }

// function run(id, wet) {
//     if (typeof id == 'number' || typeof id == 'string') {
//         var linkData = linksData.get(parseInt(id));
//         if (!linkData) {
//             return console.log(clc.red("Bad id!"));
//         }
//         // console.log(clc.blue(JSON.stringify(linkData,null,4)));
//         var linkItem = new link(linkData);
//         linkItem.run(wet);
//     } else {
//         show();
//         read({prompt: "Which link do you want to run?"}, function(error, id, isDefault) {
//             if (error) {
//                 return console.log(clc.red("Error handling input!"));
//             }
//             run(id, wet);
//         });
//     }
// }



