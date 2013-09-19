#!/usr/bin/env node
"use strict";

// npm install express socket.io open

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);
console.log("server started");

app.get('/',function(req,res){
  res.sendfile(__dirname + '/index.htm');
});

function answer(data) {
  return { answer: data.question.replace(/[\?]+$/,'') + "!!" };
}

io.sockets.on('connection', function(socket) {
  socket.on('question', function(data) {
    socket.emit('answer', answer(data));
  });
});

require('open')('http://localhost:8080', function (err) {
  if (err) throw err;
});



