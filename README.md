# React Messages Server

This is a api to the app [React Messages](https://github.com/acferM/chat-web), that makes the comunication through HTTP and Websocket protocols

## Api documentation

#### Returns the user by name

```http
  GET /users/${username}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Required**. The github user login. |

#### Returns last 15 messages from a chat

```http
  GET /messages/${chat_id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Id from chat.|

#### Creates user on database

```js
  socket.emit('user_signin', {
    avatar_url: 'string',
    login: 'string',
    email: 'string',
    name: 'string',
  })
```

#### Creates chat on database and returns the chat.id on callback

```js
  socket.emit('start_chat', {
    type: 'user' | 'group',
    usersUrl?: 'string',
    userLogin: 'string'
  }, chatId => {})
```

#### Send message

```js
  socket.emit('message', {
    chat_id: 'string',
    text: 'string'
  })
```

#### Recieve message

```js
  socket.on('message', message => {})
```

#### Recieve notification

```js
  socket.on('notification', message => {})
```
## Enviroment variables

To run this project, you'll need to add the following enviroment variables in your .env file, following the .env.example file

`DATABASE_URL="DATABASE://USER:PASSWORD@URL:PORT/NAME?schema=public"`

## Running locally

1. Clone the project

    ```bash
      git clone https://github.com/acferM/chat-server.git
    ```

2. Access project folder

    ```bash
      cd chat-server
    ```

3. Install project dependencies
    
    with yarn:
    ```bash
      yarn
    ```

    with npm:
    ```bash
      npm i
    ```

4. Run the database migrations

    with yarn:
    ```bash
      yarn prisma migrate dev
    ```

    with npm:
    ```bash
        npm run prisma migrate dev
    ```

5. Run the project

    with yarn:
    ```bash
      yarn dev
    ```

    with npm:
    ```bash
      npm run dev
    ```
## Rodando os testes

To run the tests, execute the following command

with yarn:
```bash
  yarn test
```

with npm:
```bash
  npm run test
```

## Technologies used in this project

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com)
- [SocketIO](https://socket.io)
- [jest](https://jestjs.io)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- TDD
- DDD
