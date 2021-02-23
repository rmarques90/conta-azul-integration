## Conta Azul Integration

Application to act as middleware in your application to integrate with Conta Azul.

More details and objects info: https://developers.contaazul.com/

### Requirements:

* `node 10.0.0`
* `yarn`
* `rabbit-mq >= 3`
* `mongoDB >= 3`

### Instructions:

* Clone repo
* run `yarn install`
* run `node index.js` to start the server on port `3000`

To initiate the consumers, `cd RabbitMQ && node [consumer-by-section].js`

### How does it works

Conta azul integration works with OAuth2 method. So, first, you need to enter in https://developers.contaazul.com/ and create an account to register a new app. <br>
Then you will register a new system here in the application with the supplied data. <br>

Now, with the registered system, you can liberate to the users of your application to integrate with this middleware. First you need to register the user, and then, with the returned id, call the endpoint `oauth2/authenticate/:systemId/:userId` with the requested properties to begin the process.
<br> Afterwards, your user will be requested to accept the scope of your application. And then, redirected to the URL you have registered in your system.

By now your user is integrated and ready to begin to send data to Conta Azul. To do it you need to initiate the consumers in `RabbitMQ` folder, build the function to process your data and put in the format required by Conta Azul. Your main application need to publish messages on `contaazul` exchange, `topic` type, with header `userId` containing the user registered here in the application. 

### Environment Variables Available:

* PORT = default `3000`
* MONGO_URL = default `localhost`
* MONGO_PORT = default `27017`
* MONGO_DATABASE = default `contaazul`
* JWT_ADMIN_SECRET = default `darth-vader`
* JWT_USER_SECRET = default `luke-skywalker`
* JWT_SYSTEM_SECRET = default `leia-organa`
* RABBITMQ_HOST = default `localhost`
* RABBITMQ_PORT = default `5672`
* RABBITMQ_VHOST = default ``
* RABBITMQ_USERNAME = default `guest`
* RABBITMQ_PASSWORD = default `guest`

### Endpoints available:

- Admin Login:
    ```http
    POST http://localhost:3000/login
    Content-Type: application/json 
  {
            "login": "t@t.com",
            "password": "123456"
  }
    ```
- List all systems:
    ```http
    GET http://localhost:3000/admin/system
    Authorization: <admin-jwt-token>    
    ```
- Add new System
   ```http
   POST http://localhost:3000/admin/system/add
   Authorization: <admin-jwt-token>
   Content-Type: application/json
      {
        "name": "Application",
        "url": "http://localhost:8080/crm/api/1/contaazul",
        "clientId": "asdfagaweq",
        "clientSecret": "fgasd123e12aiksfaisjf",
        "callbackUrl": "http://localhost:3000/oauth2/",
        "redirectUrlAfterAuth": "https://www.myapp.com"
      } 
   ```
- Add new user
   ```http
   POST http://localhost:3000/system/user-add
   Authorization: <system-jwt-token>
   Content-Type: application/json
      {
        "email": "1@test.com"
      } 
   ```
