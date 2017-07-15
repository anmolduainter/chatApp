/**
 * Created by anmol on 14/7/17.
 */


let socket=io();

let container;
let nameSend;
let chatList;
let arrSend=[];
let sendBtn;
let sendText;
$(function () {


    container=$('.container');
    let name=$('#name');
    let submitBtn=$('#submit');

    submitBtn.click(function () {

        socket.emit('login',name.val());

        socket.on('logged_in',data=>{

            nameSend=data;

        });

        changeDom();

    })


});

function changeDom(){

    container.empty();

    let body=$(`
 
  <div class="row">
        <div class="col" id="list-box">
            <ul id="list">
              
            </ul>
        </div>

    </div>


    <div class="row">
        <div class="col">
            <input type="text" id="message">
            <button id="sendBtn" class="btn btn-primary pull-right">Send</button>
        </div>
     </div>

       `);

    container.append(body);

    sendText=$('#message');
    sendBtn=$('#sendBtn');
    chatList=$('#list');

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
        socket.emit('send_message',JSON.stringify(arrSend))
    }
    else{

        arrSend.push(nameSend,sendText.val())
        console.log(JSON.stringify(arrSend))
        socket.emit('send_message',JSON.stringify(arrSend))

    }
}