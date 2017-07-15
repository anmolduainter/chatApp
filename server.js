/**
 * Created by anmol on 14/7/17.
 */


let express=require('express');
let http=require('http');
let io=require('socket.io');


const app=express();
const server=http.Server(app);
const socketio=io(server);


let users={};

app.use('/', express.static(__dirname + "/public_static"))
app.get('/hello',(r,s)=>{

    s.send("Hello");

})

socketio.on('connection',function (socket) {

    console.log("Client connected")


    socket.on('login',function(username){


        users[socket.id]=username;

        socket.join(username);

        socket.emit('logged_in',username);

    });


    socket.on('send_message',function (data) {
        let arr=JSON.parse(data);
        if (arr.length==3){
            let chat = `only to u -->  ${arr[1]} : ${arr[2]}`
            socketio.to(arr[0]).emit('recv_message', chat);
        }
        else if (arr.length==2){
            console.log(data);
            let chat = `${arr[0]} : ${arr[1]}`
            console.log(chat);
            socketio.emit('recv_message', chat)
        }
    })

})

server.listen(9000,function(){
    console.log("Server started")
})