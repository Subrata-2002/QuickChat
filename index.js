const { Socket }=require('dgram')//dgram means user datagram protocol.It send the data from one machine to another machine
const express = require('express')
const app=express()
const http=require('http').createServer(app)
app.set('view engine','ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
  res.render('index');
});


const io=require('socket.io')(http)
io.on('connection',(socket)=>{
  console.log('connected')
  socket.on('message',(msg)=>{
    socket.broadcast.emit('message',msg)
  })
})

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});