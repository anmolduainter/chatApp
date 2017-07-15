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

        nameSend=name.val();
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


    arrSend.push(nameSend,sendText.val())
    console.log(JSON.stringify(arrSend))
    socket.emit('send_message',JSON.stringify(arrSend))

}