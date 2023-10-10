const express = require('express');
const path = require('path');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const noteController = require('../controllers/noteController.js');
const sessionController = require('../controllers/sessionController.js');

const loginRouter = express.Router();

loginRouter.get('/', express.static(path.resolve(__dirname, '../../dist')));

loginRouter.get('/already', sessionController.validateSession, (req, res) => {
    res.status(200).send();
});

loginRouter.post('/', userController.loginUser, cookieController.setUserCookie, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    res.status(200).send();
})

loginRouter.post('/out', cookieController.wipeCookies, (req, res) => {
    res.status(200).send();
})

module.exports = loginRouter;