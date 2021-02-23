const express = require('express');
const {doLoginAdmin} = require("../Controllers/Login");

const router = express.Router();

router.post('/admin',async (req, res) => {
    let adminToken = await doLoginAdmin(req.body.login, req.body.password);
    res.json({success: true, token: adminToken});
})

module.exports = router;
