/**
 * Build a simple json response string
 * @param {String} message
 * @param {Boolean} success
 * @returns {Object}
 */
const simpleJSONResponse = (message, success) => {
    return {message: message, success: success};
}

const generateHash = (length = 10) => {
    return Math.random().toString(16).substr(2, length);
}

const generateBase64HashToken = (clientId, clientSecret) => {
    if (!clientId || !clientSecret) {
        throw new Error('params to generate base64 token are invalid')
    }
    let combinedData = `${clientId}:${clientSecret}`;
    let buff = new Buffer(combinedData);
    return `Basic ${buff.toString('base64')}`
}

const needToRefreshToken = (tokenInsertDate) => {
    if (!tokenInsertDate || !(tokenInsertDate instanceof Date)) {
        throw new Error('tokenInsertDate is invalid')
    }
    let tokenDateMillis = tokenInsertDate.getTime();
    let nowMillis = new Date().getTime();

    //the token is 60 minutes valid
    return (nowMillis - tokenDateMillis) > 3600000;
}

const {
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_VHOST,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD
} = require('./constants');

const getRabbitMQUri = () => {
    return `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/${RABBITMQ_VHOST}`
}

module.exports = {
    simpleJSONResponse, generateHash, generateBase64HashToken, needToRefreshToken, getRabbitMQUri
}