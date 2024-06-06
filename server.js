const io = require('socket.io')(3000, {
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST'], // Allow these HTTP methods
    },
  });
//Handling na pratenata poraka od strana na serverot
const users={}

io.on('connection', socket=>{
  socket.on('new-user',name=>{
users[socket.id]=name
socket.broadcast.emit('user-connected',name);
  })
    socket.on('send-chat-message',message =>{
        socket.broadcast.emit("chat-message", {message:message, name:users[socket.id]})//Porakata se praka na sekoj drug povrzan klient osven na samiot isprakac na porakata
    })

    socket.on('disconnect',()=>{
      socket.broadcast.emit('user-disconnected',  users[socket.id]);
      delete users[socket.id];
        })
});

