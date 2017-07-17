/**
 * Created by anmol on 14/7/17.
 */


let express=require('express');
let http=require('http');
const bp = require('body-parser');
let io=require('socket.io');
let db=require('./db');

const app=express();
const server=http.Server(app);
const socketio=io(server);

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

let userid;
let users={};
let chatArr=[];
app.use('/', express.static(__dirname + "/public_static"))
app.get('/hello',(r,s)=>{

    s.send("Hello");

})

socketio.on('connection',function (socket) {

    console.log("Client connected")


    socket.on('login',function(username){

        // console.log(username.nameval);
        // console.log(username.emailval);
        //
        // db.login.create({
        //     username:username.nameval,
        //     email : username.emailval
        // }).then(function (data) {
        //     userid=data.id;
        //     console.log("LoginDatabase added");
        // }).catch(function (err) {
        //     console.log(err)
        // })

        users[socket.id]=username;

        socket.join(username);             //very important line


    });


    socket.on('send_message',function (data) {
        let arr=JSON.parse(data);
        console.log(arr);
        if (arr.length==4) {

            let chat = ` # ${arr[1]} : ${arr[2]}`;
            db.Pmessages.create({
                login_id: arr[3],
                message: chat
            }).then(function () {
                console.log("Particular messages in database")
              }).catch(function (err) {
                console.log(err);
            });

            console.log(arr[0]);
            socketio.to(arr[0]).emit('recv_message', chat);

           }

        else if (arr.length==2){
            console.log(data);
            let chat = `${arr[0]} : ${arr[1]}`
        //    chatArr.push(chat);
            console.log(chat);
            db.messages.create({
                message:chat
            }).then(function () {

                console.log("BroadCast message in Database")

            }).catch(function (err) {
                console.log(err);
            });

             socketio.emit('recv_message', chat)
        }


    })

});


app.get('/detLog',function (req,res) {

    db.login.findAll().then(function (list) {
        res.send(list);
    }).catch(function (err) {
        console.log("Error occured while retrieving")
    })

});

app.get('/getRChats',function (req,res) {

   db.messages.findAll().then(function (list) {
       res.send(list)
   }).catch(function (err) {
       console.log("Error occured while retrieving")
   })

});


app.post('/getChats',function (req,res) {
    console.log(req.body.id);

    db.login.findAll({
        include: [{
            model: db.Pmessages
        }]
    }).then(function (data) {

        let id = req.body.id;
        let arr = [];

//     console.log(data)

        for (i of data) {
            if (i.id == id) {

                console.log(i.username)
                console.log(i.email)
                console.log(i.PMessages)


                for (i1 of i.PMessages) {

                    console.log(i1.message);
                    arr.push(i1.message);

                }
            }
        }

        db.messages.findAll().then(function (data1) {

            for (i of data1) {
                arr.push(i.message);
            }

            res.send({success: arr});

        });


        // console.log(data[data.length-id].username)
        // console.log(data[data.length-id].email)
        // console.log(data[data.length-id].PMessages)

    })

})

app.post('/register',(req,res)=>{


    db.login.create({
        username:req.body.nameval,
        email : req.body.emailval
    }).then(function (data) {
        userid=data.id;
        res.send(data.username);
        console.log("LoginDatabase added");
    }).catch(function (err) {
        console.log(err)
    })


});

server.listen(9000,function(){
    console.log("Server started")
})

