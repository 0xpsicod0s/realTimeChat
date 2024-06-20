const loginButton = document.querySelector('#login-button');
const sendButton = document.querySelector('#send-button');

loginButton.addEventListener('click', function () {
    const chatLogin = document.querySelector('.chat-login');

    const nicknameInput = chatLogin.childNodes[1];
    if (!nicknameInput.value.trim()) {
        const errorText = document.createTextNode('Insira um apelido');
        errorMessage.appendChild(errorText);
        return;
    }

    (function () {
        const userCount = document.querySelector('#user-count');
        const errorMessage = document.querySelector('.error-message');
        const request = new XMLHttpRequest();
        
        const evtSource = new EventSource('http://127.0.0.1:3000/events');
        evtSource.addEventListener('message', function ({ data }) {
            const stringConnectedUsers = document.createTextNode(data);
            userCount.innerHTML = '';
            userCount.append(stringConnectedUsers);
        });

        evtSource.addEventListener('userLoggedOut', function({ data }) {
            const stringConnectedUsers = document.createTextNode(data);
            userCount.innerHTML = '';
            userCount.append(stringConnectedUsers);
        });

        request.open('POST', 'http://127.0.0.1:3000/nickname');
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('loadend', function () {
            if (request.status === 200) {
                chatVisibility();
                localStorage.setItem('nickname', nicknameInput.value.trim());
                return;
            }
            const badRequest = document.createTextNode('Oops! Algo deu errado.');
            errorMessage.append(badRequest);
        });
        request.send(JSON.stringify({ nickname: nicknameInput.value.trim() }));

        function chatVisibility() {
            const chatMessages = document.querySelector('.chat-messages');
            const chatInput = document.querySelector('.chat-input');

            if (errorMessage.textContent) errorMessage.textContent = '';
            chatMessages.style.display = 'block';
            chatInput.style.display = 'block';
            userCount.style.display = 'block';
            chatLogin.style.display = 'none';
        }
    }())
});

sendButton.addEventListener('click', function () {
    const nickname = localStorage.getItem('nickname') || 'Ghost';
    const messageInput = document.querySelector('#message-input');
    const messageSent = messageInput.value;
    if (!messageSent) return;

    const evtSource = new EventSource('http://127.0.0.1:3000/events');
    evtSource.addEventListener('messageReceived', function ({ data }) {
        const { nickname, message } = JSON.parse(data);
        const chatMessages = document.querySelector('.chat-messages');

        chatMessages.innerHTML += `
            <span class="user">${nickname}</span><p class="message">${message}</p>
        `
        messageInput.value = '';
    });

    const request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:3000/send');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({ nickname: nickname, message: messageSent }));
});