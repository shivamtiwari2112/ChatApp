const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

//Ask new user for his/her name.
const name = prompt("Enter your name to join chat");
socket.emit('new-user-joined', name);

//If a new user joined let the server know.
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

//If server sends the message receive it.
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

//If the user leaves the chat append it into the container
socket.on('left', person => {
    append(`${person.name} left the chat`, 'right');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});