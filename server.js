/**
 * Created by anmol on 14/7/17.
 */


let express=require('express');
let http=require('http');
let io=require('socket.io');


const app=express();
const server=http.Server(app);
const socketio=io(server);

app.use('/', express.static(__dirname + "/public_static"))
app.get('/hello',(r,s)=>{

    s.send("Hello");

})

socketio.on('connection',function (socket) {

    console.log("Client connected")


    socket.on('send_message',function (data) {

        console.log(data);
        let arr=JSON.parse(data);

        let chat = `${arr[0]} : ${arr[1]}`
        console.log(chat);
        socket.broadcast.emit('recv_message', chat)

    })

})

server.listen(9000,function(){
    console.log("Server started")
})