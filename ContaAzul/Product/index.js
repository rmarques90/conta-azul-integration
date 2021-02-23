const axios = require('axios');
const {refreshToken} = require("../Token");
const {needToRefreshToken} = require("../../Utils");
const {CONTA_AZUL_PRODUCT_URL} = require("../../Utils/constants");

const validProductObj = (product) => {
    if (!product || !product.name || !product.value) {
        return false;
    }
    return true;
}

const searchForProduct = async (user, name, code) => {
    if (code) {
        let resp = await axios.get(`${CONTA_AZUL_PRODUCT_URL}?code=${code}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });
        if (resp && resp.data && resp.data.length) {
            return resp.data[0];
        }
    } else if (name) {
        let resp = await axios.get(`${CONTA_AZUL_PRODUCT_URL}?name=${name}`, {
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

const registerProduct = async (user, product) => {

    if (!validProductObj(product)) {
        throw new Error('product has invalid fields')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'post',
            url: CONTA_AZUL_PRODUCT_URL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: product
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const updateProduct = async (user, product) => {

    if (!validProductObj(product) || !product.id) {
        throw new Error('product has invalid fields')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'put',
            url: `${CONTA_AZUL_PRODUCT_URL}/${product.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: product
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const deleteProduct = async (user, product) => {

    if (!product.id) {
        throw new Error('product id is invalid')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        await axios({
            method: 'delete',
            url: `${CONTA_AZUL_PRODUCT_URL}/${product.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: product
        })
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    validProductObj, searchForProduct, registerProduct, updateProduct, deleteProduct
}