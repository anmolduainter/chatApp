/**
 * Created by anmol on 16/7/17.
 */

let socket=io();

let container;
let input;
let submit;
let sendBtn;
let nameSend;
let sendText;
let chatList;
$(function () {

    container=$('.container');
    submit=$('#submit');
    input=$('#name')
    submit.click(checkUser)

});

function checkUser() {

    let name=input.val()
    $.get('/detLog',function (data) {

        let a=-1;

        let dataId;

        for (i in data){

            if (data[i].username==name){

                a=1;
                dataId=data[i].id

                nameSend=data[i].username;

            }
        }

        if (a==1){
            getChats(dataId)
        }
        else if (a==-1){
            alert("No match found")
        }

    })

}

function getChats(i) {

    let messArr=[];

    console.log(i);
    $.post('/getChats',{id:i},function (data) {

      console.log(data.success);

      messArr=data.success;

        console.log(messArr);

      changeDom(messArr)

    })

}


function changeDom(mesArr){

    console.log(mesArr);

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

    for (i of mesArr){
        chatList.append($(`<li>${i}</li>`))
    }

    socket.on('recv_message', (data) => {
        chatList.append($(`<li>${data}</li>`))
    })


    sendBtn.click(send)

}

function send(){

   let arrSend=[];

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