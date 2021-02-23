const axios = require('axios');
const {CONTA_AZUL_SALE_URL} = require("../../Utils/constants");
const {refreshToken} = require("../Token");
const {needToRefreshToken} = require("../../Utils");

const validSaleObj = (sale) => {
    return !(!sale || !sale.emission || !sale.status || !sale['customer_id']);
}

const registerSale = async (user, saleObj) => {
    if (!saleObj) {
        throw new Error('saleObj is invalid')
    }

    if (!validSaleObj(saleObj)) {
        throw new Error('sale is invalid, check the fields sent')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'post',
            url: CONTA_AZUL_SALE_URL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: saleObj
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const updateSale = async (user, saleObj) => {
    if (!saleObj || !saleObj.id) {
        throw new Error('saleObj is invalid')
    }

    if (!validSaleObj(saleObj)) {
        throw new Error('sale is invalid, check the fields sent')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'put',
            url: `${CONTA_AZUL_SALE_URL}/${saleObj.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: saleObj
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const deleteSale = async (user, saleId) => {
    if (!saleId) {
        throw new Error('saleId is invalid')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'delete',
            url: `${CONTA_AZUL_SALE_URL}/${saleId}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const searchSalesByCustomerId = async (user, customerId) => {
    if (!customerId) {
        throw new Error('customerId is invalid')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios.get(`${CONTA_AZUL_SALE_URL}?customer_id=${customerId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error('Error requesting sales by customerId', e)
    }
}

module.exports = {
    buildSaleObj, registerSale, updateSale, deleteSale,
    searchSalesByCustomerId
}