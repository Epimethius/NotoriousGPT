const express = require('express');
const path = require('path');

const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const noteController = require('../controllers/noteController.js');
const sessionController = require('../controllers/sessionController.js');

const router = express.Router();

router.get('/',  express.static(path.resolve(__dirname, '../../dist')));

router.post('/', userController.signupUser, cookieController.wipeCookies, (req, res) => {
  res.status(200).send();
})

module.exports = router;