const System = require('../Models/System');
const {systemWithoutClientInfo} = require("../Projections/System");
const {systemWithFieldsFromSection} = require("../Projections/System");
const {systemWithoutFields} = require("../Projections/System");

/**
 * Method to request all system on database
 * @returns {Promise<[]>}
 */
const getAllSystems = async () => {
    const systems = await System.find().exec();
    let systemsObj = [];
    if (systems && systems.length) {
        systems.forEach(s => systemsObj.push(s.toObject()))
    }
    return systemsObj;
}

const createNewSystem = async (systemObj) => {
    let newSystem = new System(systemObj);
    try {
        await newSystem.save();
        return newSystem.toObject();
    } catch (e) {
        console.error('Error inserting new system', e);
    }
    return null;
}

const updateSystemToken = async (systemId, token) => {
    return System.updateOne({_id: systemId}, {token: token});
}

const getSystemByName = async (name, simpleProjection) => {
    let resp;
    if (simpleProjection) {
        resp = await System.findOne({name: name}).select(systemWithoutFields()).exec();
    } else {
        resp = await System.findOne({name: name}).exec();
    }
    if (resp) {
        return resp.toObject()
    }
    return null;
}

const findSystemById = async (systemId, simpleProjection) => {
    let resp;
    if (simpleProjection) {
        resp = await System.findOne({_id: systemId}).select(systemWithoutFields()).exec();
    } else {
        resp = await System.findOne({_id: systemId}).exec();
    }
    if (resp) {
        return resp.toObject()
    }
    return null;
}

const findSystemByIdWithoutClientInfo = async (systemId) => {
    let resp = await System.findOne({_id: systemId}).select(systemWithoutClientInfo()).exec();
    if (resp) {
        return resp.toObject();
    }
    return null;
}

const updateSystemFieldsBySection = async (systemId, section, fields) => {
    let fieldString = `fieldBinds.${section}`;
    let resp = await System.updateOne({_id: systemId}, {
        [fieldString]: fields
    });
    console.log(resp);
}

const getSystemFieldsBySection = async (systemId, section) => {
    let resp = await System.findOne({_id: systemId}).select(systemWithFieldsFromSection(section)).exec();
    if (resp) {
        return resp.toObject();
    }
}

module.exports = {
    getAllSystems, createNewSystem, getSystemByName, updateSystemFieldsBySection, updateSystemToken, findSystemById, getSystemFieldsBySection, findSystemByIdWithoutClientInfo
}