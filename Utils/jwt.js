const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET, JWT_SYSTEM_SECRET, JWT_USER_SECRET} = require("./constants");

/**
 * Generate a new token with app secret
 * @param {Object} admin
 * @returns {String}
 */
const generateAdminToken = (admin) => {
    if (!admin || !admin.login) {
        console.debug('admin is invalid');
        return null;
    }
    return jwt.sign(admin, JWT_ADMIN_SECRET);
}

/**
 * Validate if the token is valid and have the signature
 * @param {String} jwtToken
 * @returns {boolean}
 */
const validateAdminToken = async (jwtToken) => {
    try {
        await jwt.verify(jwtToken, JWT_ADMIN_SECRET);
    } catch (e) {
        console.error('Error validating jwt token', e);
        return false;
    }
    return true;
}

const generateSystemToken = (system) => {
    return jwt.sign(system, JWT_SYSTEM_SECRET);
}

const validateSystemToken = async (jwtToken) => {
    try {
        await jwt.verify(jwtToken, JWT_SYSTEM_SECRET);
    } catch (e) {
        console.error('Error validating jwt token', e);
        return false;
    }
    return true;
}

const getSystemTokenData = async (jwtToken) => {
    try {
        return jwt.verify(jwtToken, JWT_SYSTEM_SECRET);
    } catch (e) {
        console.error('Error validating jwt token', e);
    }
}

const generateUserToken = (user) => {
    return jwt.sign(user, JWT_USER_SECRET);
}

const validateUserToken = async (jwtToken) => {
    try {
        await jwt.verify(jwtToken, JWT_USER_SECRET);
    } catch (e) {
        console.error('Error validating jwt token', e);
        return false;
    }
    return true;
}


module.exports = {
    generateAdminToken, validateAdminToken,
    generateSystemToken, validateSystemToken, getSystemTokenData,
    generateUserToken, validateUserToken
}