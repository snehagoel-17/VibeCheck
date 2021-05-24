//we would host this
const io = require('socket.io')(8800)
const users = {}; 
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
      //  console.log('new-user',name);
       users[socket.id]=name;
       socket.broadcast.emit('user-joined',name);
    })
    socket.on('disconnect',name=>{
      socket.broadcast.emit('left',users[socket.id]);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',{ message: message, name: users[socket.id]});
    });
});
