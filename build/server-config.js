var express = require('express')
var app = express().listen(8888);
var io = require('socket.io').listen(app);
let users=[];
io.sockets.on('connection', (socket) => {
  console.log('链接成功')
  socket.on('login',function (nickName) {
    console.log('开始登陆')
    if(users.indexOf(nickName)>-1){
      socket.emit('NickExists')
    }else{
      users.push(nickName)
      socket.nickName = nickName;
      socket.emit('loginSucess')
      io.sockets.emit('showInfo', nickName, users.length, 'login');
    }
  })

  socket.on('disconnect', function() {
    if (socket.nickName != null) {
      users.splice(users.indexOf(socket.nickName), 1);
      socket.broadcast.emit('showInfo', socket.nickName, users.length, 'logout');
    }
  });

  socket.on('postMsg',function (msg) {
    socket.broadcast.emit('broadNewMsg',socket.nickName,msg)
  })
});
