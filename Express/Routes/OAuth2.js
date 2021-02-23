const express = require('express');
const {getSystemById} = require("../Controllers/System");
const {generateAccessTokens} = require("../Controllers/User");
const {getUserById} = require("../Controllers/User");
const {CONTA_AZUL_AUTHORIZE_URL} = require("../../Utils/constants");
const {saveUserTokenAfterApproval} = require("../Controllers/OAuth2");

const router = express.Router();

//here contaazul will return code and state on the query params...we need to save it and generate the accesstoken
router.get('/', async (req, res) => {
    try {
        await saveUserTokenAfterApproval(req.query.state, req.query.code);
        let user = await getUserById(req.query.state);
        //after the validate of oauth2, we need to generate the access tokens
        let system = await getSystemById(user.systemId);
        await generateAccessTokens(user, system);

        if (system.redirectUrlAfterAuth) {
            res.redirect(system.redirectUrlAfterAuth);
            return;
        }
        res.json({message: 'code saved! You can close this tab now.'});
    } catch (e) {
        res.status(500).send();
    }
})

//route to process contaazul url with user params
router.get('/authenticate/:systemId/:userId', async (req, res) => {
    let user = await getUserById(req.params.userId);
    if (!user) {
        res.status(400).send({message: 'User has invalid params'});
        return;
    }

    let system = await getSystemById(req.params.systemId);
    if (!system) {
        res.status(400).send({message: 'System is invalid'});
        return;
    }

    if (system._id.toString() !== user.systemId) {
        res.status(403).send({message: 'The user and system not belongs to each other'});
        return;
    }

    res.redirect(`${CONTA_AZUL_AUTHORIZE_URL}?scope=sales&client_id=${system.clientId}&state=${user._id}&redirect_uri=${system.callbackUrl}`)
})

module.exports = router;