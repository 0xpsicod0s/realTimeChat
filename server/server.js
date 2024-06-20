const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500', optionsSuccessStatus: 200 }));
app.use(express.json());

let clients = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const cliendId = Date.now();
    const newClient = { id: cliendId, res }
    clients.push(newClient);

    req.on('close', () => {
        clients = clients.filter(({ id }) => id !== cliendId);
        clients.forEach(client => {
            client.res.write('event: userLoggedOut\n');
            client.res.write(`data: Usuários conectados: ${clients.length}\n\n`);
        });
    });
});

app.post('/nickname', (req, res) => {
    const nickname = req.body.nickname;
    if (!nickname) {
        res.status(404).json({ error: 'Nickname não especificado' });
        return;
    }

    clients.forEach(client => {
        client.res.status(200).write(`data: Usuários conectados: ${clients.length}\n\n`);
    });
    res.status(200).json({ saved: 'Nickname salvo com sucesso!' });
});

app.post('/send', (req, res) => {
    const message = {
        nickname: req.body.nickname,
        message: req.body.message
    }

    clients.forEach(client => {
        client.res.write('event: messageReceived\n');
        client.res.write(`data: ${JSON.stringify(message)}\n\n`);
    });

    res.status(200).json({ successed: 'Mensagem enviada' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado');
});