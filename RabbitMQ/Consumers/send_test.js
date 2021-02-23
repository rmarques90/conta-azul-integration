const {startMongoConnection} = require("../../MongoDB");
const amqp = require('amqplib/callback_api');
const {RABBITMQ_PREFETCH} = require("../../Utils/constants");
const {CONTA_AZUL_SECTIONS} = require("../../Utils/constants");
const {RABBITMQ_QUEUES} = require("../../Utils/constants");
const {RABBITMQ_EXCHANGE_TO_LISTEN} = require("../../Utils/constants");
const {getRabbitMQUri} = require("../../Utils");

const startConsumer = async () => {
    await startMongoConnection();

    amqp.connect(getRabbitMQUri(), function (error0, connection) {
        if (error0) {
            throw error0;
        }

        //open channel to consume
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            //validating if the exchange is created, if not it will be created
            channel.assertExchange(RABBITMQ_EXCHANGE_TO_LISTEN, 'topic', {
                durable: true
            })

            channel.publish(RABBITMQ_EXCHANGE_TO_LISTEN, 'customer23', Buffer.from('teste de mensagem'))
        })
    })

    setTimeout(() => {
        console.log('exiting after publishing');
        process.exit(1);
    }, 3000)
}

startConsumer();