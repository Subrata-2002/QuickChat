const socket = io()
let name;
let textarea = document.querySelector('#msg');
let messageArea = document.querySelector('.msg_area');
do {
    name = prompt('Enter your name');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})
function sendMessage(message) 
{
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollBottom();
    socket.emit('message', msg);
}
function appendMessage(msg, type) {
    let x = document.createElement("div")
    x.classList.add(type)
    let y = "<h4>" + msg.user + "</h4><p>" + msg.message + "</p>"
    x.innerHTML = y
    messageArea.appendChild(x)
}
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollBottom();
})
function scrollBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}