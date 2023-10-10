const express = require('express');
const path = require('path');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const noteController = require('../controllers/noteController.js');
const sessionController = require('../controllers/sessionController.js');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).send('ya found me');
//   console.log(path.resolve(__dirname, '../../dist'));
// })

router.get('/', express.static(path.resolve(__dirname, '../../dist')));

router.get('/notes', sessionController.validateSession, noteController.getNotes, (req, res) => {
  console.log('made it to the end no problem');
  res.status(200).send(res.locals.notes);
})

router.post('/', sessionController.validateSession, noteController.addNote, (req, res) => {
  res.status(200).send(res.locals.newNote);
})

router.put('/', sessionController.validateSession, noteController.updateNote, (req, res) => {
  res.status(200).send();
})

router.delete('/', sessionController.validateSession, noteController.deleteNote, (req, res) => {
  res.status(200).send(res.locals.deleted);
})

module.exports = router;