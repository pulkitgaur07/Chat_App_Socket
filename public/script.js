var socket = io();

let btn = document.getElementById('btn');
let newmsg = document.getElementById('newmsg');
let msgList = document.getElementById('msgList');

btn.onclick = function exec(){
    socket.emit('msg_send',{
        msg : newmsg.value
    })
    newmsg.value = '';
}

// When a message is received, display it with the corresponding color
socket.on('msg_rcvd',(data)=>{
    console.log(data);
    let listmsg = document.createElement('li');
    
    if (data.senderId === socket.id) {
        listmsg.innerText = `${data.msg} ✔️`;
    } else {
        listmsg.innerText = `${data.msg}`;
    }

    // Set the text color based on the user's assigned color
    // listmsg.style.color = data.color;
    listmsg.style.border = "2px solid black";
    listmsg.style.padding = "5px";
    listmsg.style.borderRadius = "5px";
    listmsg.style.margin = "2px 0";

    // Apply text-wrapping styles to avoid horizontal scrolling
    listmsg.style.overflowWrap  = "break-word";     // Break long words
    listmsg.style.wordBreak = "break-all";     // Break even long continuous text
    listmsg.style.maxWidth = "60%";            // Limit the max width of the message box

    // Align "Me" messages to the right and "You" messages to the left
    if (data.senderId === socket.id) {
        listmsg.style.textAlign = "right";
        listmsg.style.marginLeft = "auto";     // Push "Me" messages to the right
        listmsg.style.backgroundColor = "#31EA67"; // Different background for "Me"
    } else {
        listmsg.style.textAlign = "left";
        listmsg.style.marginRight = "auto";    // Push "You" messages to the left
        listmsg.style.backgroundColor = "#ffff"; // Different background for "You"
    }

    msgList.appendChild(listmsg);
})