const axios = require('axios');
const {findUserById} = require("../../MongoDB/Controllers/User");
const {updateUserAccessTokenRefreshTokenExpiresIn} = require("../../MongoDB/Controllers/User");
const {generateBase64HashToken} = require("../../Utils");
const {CONTA_AZUL_REFRESH_TOKEN} = require("../../Utils/constants");
const {findSystemById} = require("../../MongoDB/Controllers/System");

const refreshToken = async (user) => {
    if (!user.accessToken || !user.refreshToken) {
        throw new Error('Tokens are invalid')
    }

    let system = await findSystemById(user.systemId);

    let resp = await axios({
        method: 'post',
        url: `${CONTA_AZUL_REFRESH_TOKEN}?grant_type=refresh_token&refresh_token=${user.refreshToken}`,
        headers: {
            Authorization: generateBase64HashToken(system.clientId, system.clientSecret)
        },
        data: {
            'grant_type': 'refresh_token',
            'refresh_token': user.refreshToken
        }
    })

    if (resp && resp.data) {
        await updateUserAccessTokenRefreshTokenExpiresIn(user._id, resp.data['access_token'], resp.data['refresh_token'], resp.data['expires_in']);
    }

    return await findUserById(user._id);
}

module.exports = {
    refreshToken
}