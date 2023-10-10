const express = require('express');
const path = require('path');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/', aiController.getSummary, (req, res) => {
    console.log(res.locals.summary);
    res.status(200).send(res.locals.summary);
})

module.exports = router;