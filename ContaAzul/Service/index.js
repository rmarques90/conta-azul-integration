const axios = require('axios');
const {refreshToken} = require("../Token");
const {needToRefreshToken} = require("../../Utils");
const {CONTA_AZUL_SERVICE_URL} = require("../../Utils/constants");

const validServiceObj = (service) => {
    if (!service || !service.name || !service.value) {
        return false;
    }
    return true;
}

const searchForService = async (user, name, code) => {
    if (code) {
        let resp = await axios.get(`${CONTA_AZUL_SERVICE_URL}?code=${code}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        if (resp && resp.data && resp.data.length) {
            return resp.data[0];
        }
    } else if (name) {
        let resp = await axios.get(`${CONTA_AZUL_SERVICE_URL}?name=${name}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        if (resp && resp.data && resp.data.length) {
            return resp.data[0];
        }
    }
    return null;
}

const registerService = async (user, service) => {

    if (!validServiceObj(service)) {
        throw new Error('service has invalid fields')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'post',
            url: CONTA_AZUL_SERVICE_URL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: service
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const updateService = async (user, service) => {

    if (!validServiceObj(service) || !service.id) {
        throw new Error('service has invalid fields')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'put',
            url: `${CONTA_AZUL_SERVICE_URL}/${service.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: service
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const deleteService = async (user, service) => {

    if (!service.id) {
        throw new Error('service id is invalid')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        await axios({
            method: 'delete',
            url: `${CONTA_AZUL_SERVICE_URL}/${service.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: service
        })
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    validServiceObj, searchForService, registerService, updateService, deleteService
}