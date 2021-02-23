const express = require('express');
const {AVAILABLE_SECTIONS_FIELDS} = require("../../Utils/constants");
const {AVAILABLE_FIELDS_CONTA_AZUL_BY_SECTION} = require("../../Utils/constants");
const {CONTA_AZUL_SALE_URL} = require("../../Utils/constants");
const {getUserById} = require("../Controllers/User");

const router = express.Router();

//route to request the sales pdf
router.get('/sale-pdf/:saleId/:userId', async (req, res) => {
    if (!req.params.saleId || !req.params.userId) {
        res.status(400).send({message: 'Invalid sale id or user id...must be sale-pdf/saleId/userId'})
        return;
    }

    let user = await getUserById(req.params.userId);
    if (!user) {
        res.status(400).send({message: 'User not found'})
    }

    res.redirect(`${CONTA_AZUL_SALE_URL}/${req.params.saleId}/pdf`);
})

router.get('/available-fields/:section', (req, res) => {
    if (!req.params.section || !AVAILABLE_SECTIONS_FIELDS.includes(req.params.section)) {
        res.status(400).send({message: 'invalid section'})
        return;
    }

    res.json(AVAILABLE_FIELDS_CONTA_AZUL_BY_SECTION[req.params.section]);
})


module.exports = router;