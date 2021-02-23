const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const {PORT} = require('./Utils/constants');
const {startMongoConnection} = require("./MongoDB");

const LoginRouter = require('./Express/Routes/Login');
const AdminRouter = require('./Express/Routes/Admin');
const OAuth2 = require('./Express/Routes/OAuth2');
const System = require('./Express/Routes/System');
const ContaAzul = require('./Express/Routes/ContaAzul');

const app = express();
app.use(bodyparser.json());
app.use(cors());

app.use('/login', LoginRouter);
app.use('/admin', AdminRouter);
app.use('/oauth2', OAuth2);
app.use('/system', System);
app.use('/conta-azul', ContaAzul);

startMongoConnection();

app.listen(PORT, () => {
    console.log(`Express server started! Listening on: ${PORT}`);
})