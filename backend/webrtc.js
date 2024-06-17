const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('server is running');
});

let incall={}
io.on('connection', (socket) => {
  socket.emit('me', socket.id);
   
  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    if(incall[userToCall]){
      socket.emit("alreadyincall",{msg:'already in call'})
      return
    }
    incall[userToCall]=true
    incall[from]=true

    console.log("request for call to userid",userToCall)
    io.to(userToCall).emit('calluser', { signal: signalData, from, name });
  });

  socket.on('answercall', (data) => {
    console.log("request for answer")
    
    io.to(data.to).emit('callaccepted', data.signal);
    
  });socket.on('leavecall',(data)=>{
    console.log(incall)
    delete incall[data.id]
    
    console.log(incall)
  })

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
