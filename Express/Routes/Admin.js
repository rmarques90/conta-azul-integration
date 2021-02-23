const express = require('express');
const {getSystemTokenData} = require("../../Utils/jwt");
const {updateFieldsBySection} = require("../Controllers/System");
const {addNewSystem} = require("../Controllers/System");
const {validateAdminToken} = require("../../Utils/jwt");
const {getAllSystems} = require("../../MongoDB/Controllers/System");

const router = express.Router();

//middleware to validate if has header Authorization and jwtToken
router.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return;
    }
    let validAdminToken = await validateAdminToken(req.headers.authorization);
    if (validAdminToken) {
        next();
        return;
    }
    res.status(403).json({message: 'Unauthorized'});
})

/**
 * Route to list all systems
 */
router.get('/system', async (req, res) => {
    const systems = await getAllSystems();
    res.json({systems: systems});
});

/**
 * Route to add a new System
 */
router.post('/system/add', async (req, res) => {
    try {
        let newSystem = await addNewSystem(req.body);
        res.json({system: newSystem});
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = router;