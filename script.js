const socket = io('http://localhost:3000');
const messageContainer = document.querySelector('.container')
const messageForm = document.querySelector('.send-container');
const messageInput = document.querySelector('.message-input');

let newName = '';
let user = prompt('What is your name?');
socket.emit('new-user', user)

socket.on('user-connected', name => {
    newMessage(`${name} is connected!`)
})


messageForm.addEventListener('click', e=>{
    e.preventDefault();
    const text = messageInput.value;
    socket.emit('new-message', text)
})

socket.on('user-message', text => {
newMessage(`${text.user} :  ${text.message}`)
})

function newMessage(msg){
    const messageBox = document.createElement('p');
    messageBox.innerText = msg;
    messageContainer.append(messageBox);
}

