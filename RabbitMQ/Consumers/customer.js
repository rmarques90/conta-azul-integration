const {startMongoConnection} = require("../../MongoDB");
const amqp = require('amqplib/callback_api');
const {updateLogStatusById} = require("../../MongoDB/Controllers/Logs");
const {saveNewLog} = require("../../MongoDB/Controllers/Logs");
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

            console.log("Connected! Let's connect on queue and create channel");

            //setting events of error or close
            channel.on("error", function(err) {
                console.error("[AMQP] channel error", err.message);
                process.exit(0);
            });
            channel.on("close", function() {
                console.info("[AMQP] channel closed");
                process.exit(0);
            });

            //validating if the exchange is created, if not it will be created
            channel.assertExchange(RABBITMQ_EXCHANGE_TO_LISTEN, 'topic', {
                durable: true
            })

            //validating if the queue is created, if not it will be created
            channel.assertQueue(RABBITMQ_QUEUES[CONTA_AZUL_SECTIONS.CUSTOMER], {
                durable: true
            })

            //binding the queue to get messages from domain
            channel.bindQueue(RABBITMQ_QUEUES[CONTA_AZUL_SECTIONS.CUSTOMER], RABBITMQ_EXCHANGE_TO_LISTEN, 'customer');

            console.info(`[*] Waiting for messages in exchange: '${RABBITMQ_EXCHANGE_TO_LISTEN}' --- queue: '${RABBITMQ_QUEUES[CONTA_AZUL_SECTIONS.CUSTOMER]}'... CTRL+C to exit!`);

            //setting prefetch qty
            channel.prefetch(RABBITMQ_PREFETCH);

            //listening event
            channel.consume(RABBITMQ_QUEUES[CONTA_AZUL_SECTIONS.CUSTOMER], async function(msg) {
                try {
                    //code example to consume message from somewhere and use the functions to save in Conta Azul
                    console.log('headers', msg.properties.headers);
                    if (msg.content) {
                        let log = await saveNewLog({_id: msg.properties.headers.userId}, JSON.parse(msg.content.toString()));
                        console.log('content', msg.content.toString())
                        console.log('log obj', log);

                        await updateLogStatusById(log.id, 1);
                    }
                    channel.ack(msg);
                } catch (e) {
                    console.error("Error processing message", e);
                    channel.reject(msg, false); //to requeue, change to true
                }
            }, { noAck: false })

        })
    })

}

startConsumer();