const express= require('express')
const app= express()
const http =require('http')
const {Server} = require('socket.io')
const cors=require('cors')
app.use(express.json())
var fs = require('fs');

app.use(cors())
const port=3001

//Server Created 
const server = http.createServer(app)

// Socket IO Created
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000'   
    } 
})
// IO On Connection
io.on('connection',(socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on('update',(data)=>{
         const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Markdown Editor</title>
          </head>
          <body>
            ${data.message}
          </body>
        </html>
      `;
        socket.emit('receive_message', htmlContent)
    })

    socket.on('connect_error', err => console.log('Connection Error : ',err))
    socket.on('connect_failed', err => handleErrors('Connection Failed',err))

    socket.on('disconnect',()=>{
      console.log("Socket Disconnected");
    })
    
})


//this is without Socket IO
// app.post('/send',(req,res)=>{
//     console.log(req.body.message)
//     // res.json(req.body);
//     const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Node.js HTML Example</title>
//       </head>
//       <body>
//         ${req.body.message}
//       </body>
//     </html>
//   `;
//   res.setHeader('Content-Type', 'text/html');
//   res.send(htmlContent)
// })

server.listen(port, ()=> console.log("Server Started running on port " + port))