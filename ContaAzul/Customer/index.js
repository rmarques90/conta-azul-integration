const axios = require('axios');
const {refreshToken} = require("../Token");
const {needToRefreshToken} = require("../../Utils");
const {CONTA_AZUL_CUSTOMER_URL} = require("../../Utils/constants");

const validCustomerObj = (customer) => {
    return !(!customer || !customer.name || !customer['person_type']);
}

const searchForCustomer= async (user, string) => {
    if (!string) {
        throw new Error('customer string is invalid')
    }

    //this endpoint allows to search the string in: customer's company_name, name, email and document(CPF / CNPJ) fields, and other text parameters(company_name, name and document) will be ignored
    let resp = await axios.get(`${CONTA_AZUL_CUSTOMER_URL}?search=${string}`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
    if (resp && resp.data && resp.data.length) {
        return resp.data[0];
    }
}

const getCustomerContacts = async (user, customerUuid) => {
    if (!customerUuid) {
        throw new Error('customer uuid is invalid')
    }
    let resp = await axios.get(`${CONTA_AZUL_CUSTOMER_URL}/${customerUuid}/contacts`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
    if (resp && resp.data && resp.data.length) {
        return resp.data;
    }
}

const registerCustomer = async (user, customerObj) => {
    if (!customerObj) {
        throw new Error('customerObj is invalid')
    }

    if (!validCustomerObj(customerObj)) {
        throw new Error('customer is invalid, check the fields sent')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'post',
            url: CONTA_AZUL_CUSTOMER_URL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: customerObj
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const updateCustomer = async (user, customerObj) => {
    if (!customerObj || !customerObj.id) {
        throw new Error('customerObj is invalid')
    }

    if (!validCustomerObj(customerObj)) {
        throw new Error('customer is invalid, check the fields sent')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'put',
            url: `${CONTA_AZUL_CUSTOMER_URL}/${customerObj.id}`,
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            },
            data: customerObj
        })

        if (resp && resp.data) {
            return resp.data
        }
    } catch (e) {
        throw new Error(e);
    }
}

const deleteCustomer = async (user, customerId) => {
    if (!customerId) {
        throw new Error('customerObj is invalid')
    }

    const hasToRefreshToken = needToRefreshToken(user);
    if (hasToRefreshToken) {
        //lets refresh the token before request
        user = refreshToken(user);
    }

    try {
        let resp = await axios({
            method: 'delete',
            url: `${CONTA_AZUL_CUSTOMER_URL}/${customerId}`,
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

module.exports = {
    registerCustomer, updateCustomer, deleteCustomer, validCustomerObj,
    searchForCustomer, getCustomerContacts
}