const socket = io();
let naame = '';
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_box');

function playNotificationSound() {
    var audio = new Audio('news-ting-6832.mp3'); 
    audio.play();
}

do {
    naame = prompt('Choose a name');
} while (!naame);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: naame,
        message: message.trim(),
    };
    
    appendMessage(msg, 'out');
    textarea.value = '';
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);

    if (type === 'in') {
        playNotificationSound();
    }
}

socket.on('message', msg => {
    appendMessage(msg, 'in');
});
