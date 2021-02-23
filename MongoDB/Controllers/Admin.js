const Admin = require('../Models/Admin');
const {nameAndLogin} = require("../Projections/Admin");

/**
 * Get a Admin with login and password (to validate if it exists)
 * @param {String} login
 * @param {String} password
 * @returns {Object<Admin>}
 */
const getAdminByLoginAndPassword = async (login, password) => {
    if (!login || !password) {
        console.debug('login or password is null...');
        return null;
    }
    const found = await Admin.findOne({login: login, password: password}).select(nameAndLogin()).exec();
    if (found) {
        return found.toObject();
    }
    return null;
}

/**
 * Save new JWT Token to Admin
 * @param {String} _id
 * @param {String} newJwtToken
 * @returns {void}
 */
const updateJwtToken = async (_id, newJwtToken) => {
    if (!_id || !newJwtToken) {
        console.debug('_id or jwt token is invalid...');
        return;
    }
    await Admin.updateOne({_id: _id}, {jwtToken: newJwtToken});
}

module.exports = {
    getAdminByLoginAndPassword, updateJwtToken
}