const db = require('../models/noteModel.js');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};

userController.loginUser = async (req, res, next) => {
  console.log('made it to loginUser');
  const {username, password} = req.body;
  console.log('username is :', username, 'password is: ', password);
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await db.query(query, values);
  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (valid){
    res.locals.user = user;
    return next();
  }
  else{
    return next(
      {log: 'failed to login',
          status: 400,
          message: {error: 'Incorrect Username or Password'}
      });
  }
};

userController.signupUser = async (req, res, next) => {
  const {username, password} = req.body;
  const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, hash];
  try{
  const newUser = await db.query(query, values);
  res.locals.newUser = newUser.rows[0];
  return next();
  }
  catch(err){
    return next({log: 'failed to login',
          status: 400,
          message: {error: err}
      });
  }

}


module.exports = userController;