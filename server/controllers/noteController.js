const db = require('../models/noteModel.js');

const noteController = {};

noteController.getNotes = async (req, res, next) => {
  const query = 'SELECT _id, note_title, note_text FROM notes WHERE user_id = $1';
  const values = [req.cookies.userID];
  try{
  const rows = await db.query(query, values);
  res.locals.notes = rows.rows;
  next();
  }
  catch(err){
    next({log: 'failed to get notes from database',
          status: 400,
          message: {error: err}})
  }
}

noteController.addNote = async (req, res, next) => {
  if(!req.body.title) {
    return next({log: 'no title provided',
                 status: 400,
                 message: {error: 'please give note a title or user'}});
  }
  //switch to using unique ID's
  let query, values;
  if(!req.body.id){
    console.log('ya addin a new note');
    query = 'INSERT INTO notes (note_title, note_text, user_id) VALUES ($1, $2, $3) RETURNING *'
    values = [req.body.title, req.body.text, req.cookies.userID];
  }
  else {
    query = 'INSERT INTO notes (note_title, note_text, user_id, _id) OVERRIDING SYSTEM VALUE VALUES ($1, $2, $3, $4) ON CONFLICT (_id) DO UPDATE SET note_text = EXCLUDED.note_text, user_id = EXCLUDED.user_id RETURNING *'
    values = [req.body.title, req.body.text, req.cookies.userID, req.body.id];
  }
  try{
    console.log(query, values);
    const row = await db.query(query, values);
    console.log('Row is: ', row);
    res.locals.newNote = row.rows;
    return next();
  }
  catch(err){
    next({log: 'failed to add notes to database',
          status: 400,
          message: {error: err}})
  }
}

noteController.updateNote = async (req, res, next) => {
  const query = 'UPDATE notes SET note_text = $2 WHERE note_title = $1 AND user_id = $3'
  const values = [req.body.title, req.body.text, req.body.user];
  try{
    const count = await db.query(query, values);
    return next();
  }
  catch(err){
    next({log: 'failed to update note from database',
          status: 400,
          message: {error: err}})
  }
}

noteController.deleteNote = async(req, res, next) => {
  const query = 'DELETE FROM notes WHERE _id = $1 RETURNING *'
  const values = [req.body.id];
  try{
    const deleted = await db.query(query, values);
    res.locals.deleted = deleted;
    return next();
  }
  catch(err){
    return next({log: 'failed to delete note from database',
          status: 400,
          message: {error: err}})
  }
};

module.exports = noteController;