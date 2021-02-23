const {generateBase64HashToken} = require("../../Utils");
const {findUserById} = require("../../MongoDB/Controllers/User");
const {saveUser} = require("../../MongoDB/Controllers/User");

const axios = require('axios');
const {findUserByIdAndSystemId} = require("../../MongoDB/Controllers/User");
const {updateUserJwtToken} = require("../../MongoDB/Controllers/User");
const {generateUserToken} = require("../../Utils/jwt");
const {updateUserAccessTokenRefreshTokenExpiresIn} = require("../../MongoDB/Controllers/User");
const {CONTA_AZUL_TRADE_CODE_AUTHORIZATION_TOKEN} = require("../../Utils/constants");

const addNewUser = async (user, systemId) => {
    if (!user.email) {
        return;
    }
    user.systemId = systemId;
    let savedUser = await saveUser(user);
    await updateUserJwtToken(savedUser._id, generateUserToken(savedUser));
    return await findUserById(savedUser._id);
}

const getUserById = async (id) => {
    if (!id) {
        throw new Error('id is invalid...');
    }
    return await findUserById(id);
}

const getUserByIdAndSystemId = async (id, system) => {
    if (!id || !system || !system.id) {
        throw new Error('Invalid params to request user by id and system id')
    }
    return await findUserByIdAndSystemId(id, system.id);
}

const generateAccessTokens = async (user, system) => {
    let authorizationToken = generateBase64HashToken(system.clientId, system.clientSecret);
    try {
        let resp = await axios({
            method: 'POST',
            url: CONTA_AZUL_TRADE_CODE_AUTHORIZATION_TOKEN,
            headers: {
                Authorization: authorizationToken,
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: {
                'grant_type': 'authorization_code',
                'redirect_uri': system.callbackUrl,
                'code': user.code
            }
        })

        if (resp && resp.data) {
            await updateUserAccessToken(user._id, resp.data['access_token'], resp.data['refresh_token'], resp.data['expires_in']);
        }
    } catch (e) {
            console.error('Error trading code for authorization token', e);
        throw new Error();
    }
}

const updateUserAccessToken = async (userId, accessToken, refreshToken, expiresIn) => {
    return updateUserAccessTokenRefreshTokenExpiresIn(userId, accessToken, refreshToken, expiresIn);
}



module.exports = {
    addNewUser, getUserById, generateAccessTokens, getUserByIdAndSystemId
}