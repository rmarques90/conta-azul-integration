const express = require('express');
const {getUserByIdAndSystemId} = require("../Controllers/User");
const {addNewUser} = require("../Controllers/User");
const {getFieldsBySection} = require("../Controllers/System");
const {updateFieldsBySection} = require("../Controllers/System");
const {getSystemTokenData} = require("../../Utils/jwt");
const {validateSystemToken} = require("../../Utils/jwt");

const router = express.Router();

//middleware to validate if has header Authorization and jwtToken
router.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return;
    }
    let validAdminToken = await validateSystemToken(req.headers.authorization);
    if (validAdminToken) {
        next();
        return;
    }
    res.status(403).json({message: 'Unauthorized'});
})

/**
 * Add a new user to the system
 */
router.post('/user-add', async (req, res) => {
    try {
        let user = await addNewUser(req.body, await getSystemTokenData(req.headers.authorization));
        if (!user) {
            res.status(404);
            return;
        }
        res.json({user: user});
    } catch (e) {
        console.error('Error on request to add new user', e);
        res.status(400).send(e.message);
    }
})

/**
 * Get user from the system
 */
router.get('/user/:id', async (req, res) => {
    let systemInfo = await getSystemTokenData(req.headers.authorization)
    let user = await getUserByIdAndSystemId(req.params.id, systemInfo);
    if (!user) {
        res.status(404).send();
        return;
    }

    res.json({user: user});
})

router.post('/update-fields/:section', async (req, res) => {
    try {
        const systemInfo = await getSystemTokenData(req.headers.authorization);
        const section = req.params.section;
        await updateFieldsBySection(section, req.body, systemInfo)
        res.json(await getFieldsBySection(systemInfo._id, section));
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = router;