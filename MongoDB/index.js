const mongoose = require('mongoose');
const {MONGO_URL, MONGO_DATABASE, MONGO_PORT} = require("../Utils/constants");
const Admin = require('./Models/Admin');
const {DEFAULT_FIRST_ADMIN_PASSWORD} = require("../Utils/constants");
const {generateAdminToken} = require("../Utils/jwt");

let connection;
const startMongoConnection = async () => {
    await mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    connection = mongoose.connection;

    await checkAndCreateFirstAdmin();
}

const checkAndCreateFirstAdmin = async () => {
    let hasAdmin = await Admin.find().exec();
    if (!hasAdmin || !hasAdmin.length) {
        let admin = {
            login: 't@t.com',
            password: DEFAULT_FIRST_ADMIN_PASSWORD
        };
        admin.jwtToken = generateAdminToken(admin);

        let adminModelObj = new Admin(admin);
        await adminModelObj.save();
    }
}

module.exports = {
    startMongoConnection
}