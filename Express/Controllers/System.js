const {findSystemByIdWithoutClientInfo} = require("../../MongoDB/Controllers/System");
const {getSystemFieldsBySection} = require("../../MongoDB/Controllers/System");
const {findSystemById} = require("../../MongoDB/Controllers/System");
const {updateSystemToken} = require("../../MongoDB/Controllers/System");
const {updateSystemFieldsBySection} = require("../../MongoDB/Controllers/System");
const {AVAILABLE_SECTIONS_FIELDS} = require("../../Utils/constants");
const {createNewSystem, getSystemByName} = require("../../MongoDB/Controllers/System");
const {generateSystemToken} = require("../../Utils/jwt");

/**
 * Save a new system
 * @param {Object<System>} systemObj
 * @returns {Object<System>}
 */
const addNewSystem = async (systemObj) => {
    if (!systemObj.name || !systemObj.url) {
        throw new Error('SystemObj is invalid')
    }
    let existsOnDatabase = await getSystemByName(systemObj.name, true);
    if (existsOnDatabase) {
        return existsOnDatabase
    }
    systemObj = await createNewSystem(systemObj);
    await updateSystemToken(systemObj._id, await generateSystemToken(await findSystemByIdWithoutClientInfo(systemObj._id)));

    return await findSystemByIdWithoutClientInfo(systemObj._id);
}

const updateFieldsBySection = async (section, fields, system) => {
    if (!section || !AVAILABLE_SECTIONS_FIELDS.includes(section) || !fields || !Object.keys(fields).length) {
        console.debug('Invalid section...');
        throw new Error('invalid section');
    }
    await updateSystemFieldsBySection(system._id, section, fields);
}

const getFieldsBySection = async (systemId, section) => {
    if (!systemId || !section || !AVAILABLE_SECTIONS_FIELDS.includes(section)) {
        throw new Error('invalid id or section...')
    }
    return await getSystemFieldsBySection(systemId, section);
}

const getSystemById = async (systemId) => {
    if (!systemId) {
        throw new Error('system id is invalido')
    }
    return await findSystemById(systemId, true);
}


module.exports = {
    addNewSystem, updateFieldsBySection, getFieldsBySection, getSystemById
}