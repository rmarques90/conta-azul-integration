const Logs = require('../Models/Logs');

const saveNewLog = async (user, data) => {
    if (!user || !data) {
        throw new Error('user or data is invalid')
    }

    let log = new Logs({
        userId: user.id,
        data: data
    });
    await log.save();

    return log;
}

const updateLogStatusById = async (logId, status) => {
    if (!logId) {
        throw new Error('logId is invalid');
    }

    await Logs.updateOne({_id: logId}, {status: status}).exec();
}

module.exports = {
    saveNewLog, updateLogStatusById
}