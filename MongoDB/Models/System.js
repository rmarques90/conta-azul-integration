const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const System = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    fieldBinds: {
        sale: {},
        product: {},
        service: {},
        customer: {}
    },
    clientId: {
        type: String,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    callbackUrl: {
        type: String,
        required: true
    },
    redirectUrlAfterAuth: {
        type: String
    },
}, {collection: 'System'})

module.exports = mongoose.model('System', System);