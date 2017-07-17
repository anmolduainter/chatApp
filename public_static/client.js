/**
 * Created by anmol on 14/7/17.
 */


let socket=io();

let container;
let nameSend;
let chatList;
let email;
let arrSend=[];
let sendBtn;
let sendText;
$(function () {


    container=$('.container');
    let name=$('#name');
    let email=$('#email')
    let submitBtn=$('#submit');

    submitBtn.click(function () {

        let nameval=name.val();
        let emailval=email.val();

        $.post('/register',{nameval:nameval,emailval:emailval},function (res) {


           // socket.emit('Register',res);

            // socket.on('logged_in',data=>{
            //     nameSend=data;
            // });

            nameSend=res;

            socket.emit('login',nameSend);

            console.log(nameSend);

            getChats();


        })

    })


});


function getChats(){

    let marr=[];

    $.get('/getRChats',function (data) {

        for (i of data){
            marr.push(i.message);
        }

        changeDom(marr)


    })

}


function changeDom(marr){

    container.empty();

    let body=$(`
 
  <div class="row">
        <div class="col text-center" class="list-box">
            <ul id="send-list">
              
            </ul>
        </div>
    </div>
  
    <br>

    <div class="row">
        <div class="col text-center">
            <input placeholder="Write Message" type="text" id="message">
            <button id="sendBtn" class="btn btn-primary pull-right">Send</button>
        </div>
     </div>

       `);

    container.append(body);

    sendText=$('#message');
    sendBtn=$('#sendBtn');
    chatList=$('#send-list');
    for (i of marr){
        chatList.append($(`<li>${i}</li><br>`))
    }
    socket.on('recv_message', (data) => {
        chatList.append($(`<li>${data}</li>`))
    })


    sendBtn.click(send)

}

function send(){

    arrSend=[];

    let text=sendText.val();

    if (text.charAt(0)==='@'){

        arrSend.push(text.substr(1).split(' ')[0],nameSend,sendText.val().replace(text.split(' ')[0],''))
        console.log(arrSend);
       // socket.emit('send_message',JSON.stringify(arrSend))


        $.get('/detLog',function (data) {

            for (i of data) {
                if (i.username == arrSend[0]) {
                    arrSend.push(i.id)
                    socket.emit('send_message',JSON.stringify(arrSend))
                }
            }
        })



    }
    else{

        arrSend.push(nameSend,sendText.val())
        console.log(JSON.stringify(arrSend))
        socket.emit('send_message',JSON.stringify(arrSend))

    }
}