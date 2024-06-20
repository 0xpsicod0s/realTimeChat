# Chat em Tempo Real

Este projeto é um chat em tempo real desenvolvido com a arquitetura Comet, utilizando Server-Sent Events (SSE) através da API EventSource. Como a comunicação é unidirecional, a API XMLHttpRequest é utilizada para fazer requisições HTTP para o servidor.
## Tecnologias Utilizadas

- **Server-Sent Events (SSE)**: Permite que o servidor envie atualizações para o cliente em uma conexão HTTP persistente.
- **EventSource API**: Utilizada para receber eventos enviados pelo servidor.
- **XMLHttpRequest**: Utilizada para enviar mensagens do cliente para o servidor.

## Documentação

[NodeJS](https://nodejs.org/docs/latest/api/)

[Express](https://expressjs.com/en/starter/installing.html)

[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/0xpsicod0s/realTimeChat.git
```

Entre no diretório do projeto

```bash
  cd realTimeChat/
```

Instale as dependências (espera-se que você esteja dentro do diretório realTimeChat)

```bash
  cd ./server
  npm install
```

Inicie o servidor

```bash
  node ./server/server.js
```


## Screenshot de exemplo

![App Screenshot](https://i.imgur.com/InKn2aZ.png)

# Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.