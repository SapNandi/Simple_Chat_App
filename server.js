const express = require('express');
const path = require('path');
const http = require('http');
const {Server} = require("socket.io");

const app = express();
const PORT = 8000;

const server = http.createServer(app)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get("/", (req, res)=>{
    // res.send("Saptarshi");
    res.sendFile(__dirname + "/index.html")
})

// Socket Setup

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log("A user connected to Socket");
    socket.on('message', (msg)=>{
        // console.log(msg);
        socket.broadcast.emit('message', msg)
    })
})


server.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`);
})
