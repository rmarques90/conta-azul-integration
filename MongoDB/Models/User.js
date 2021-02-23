const System = require('./System');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    systemId: {
        type: String,
        required: true
    },
    jwtToken: {
        type: String
    },
    code: {
        type: String
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    expiresIn: {
        type: String
    },
    tokenInsertDate: {
        type: Date
    }
}, {collection: 'User'});

module.exports = mongoose.model('User', User);