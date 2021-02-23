const mongoose = require('mongoose');
const {LOGS_STATUS} = require("../../Utils/constants");

const Schema = mongoose.Schema;

const Logs = new Schema({
    userId: {
        type: String
    },
    data: {
        type: Object
    },
    status: {
        type: Number,
        default: LOGS_STATUS.RECEIVED
    },
    createdDate: {
        type: Date,
        default: new Date(),
        required: true
    }
}, {collection: 'Logs'})

module.exports = mongoose.model('Logs', Logs);