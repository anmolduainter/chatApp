/**
 * Created by anmol on 14/7/17.
 */


let express=require('express');
let http=require('http');
let io=require('socket.io');
let db=require('./db');

const app=express();
const server=http.Server(app);
const socketio=io(server);

let users={};
let chatArr=[];
app.use('/', express.static(__dirname + "/public_static"))
app.get('/hello',(r,s)=>{

    s.send("Hello");

})

socketio.on('connection',function (socket) {

    console.log("Client connected")


    socket.on('login',function(username){


        console.log(username.nameval);
        console.log(username.emailval);

        users[socket.id]=username.nameval;

        socket.join(username.nameval);

        socket.emit('logged_in',username.nameval);

    });


    socket.on('send_message',function (data) {
        let arr=JSON.parse(data);
        if (arr.length==3){
            let chat = ` # ${arr[1]} : ${arr[2]}`
            chatArr.push(chat);
            socketio.to(arr[0]).emit('recv_message', chat);
        }
        else if (arr.length==2){
            console.log(data);
            let chat = `${arr[0]} : ${arr[1]}`
            chatArr.push(chat);
            console.log(chat);
            socketio.emit('recv_message', chat)
        }
    })

})

server.listen(9000,function(){
    console.log("Server started")
})

