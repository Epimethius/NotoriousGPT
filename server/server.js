const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const notesRouter = require('./routers/notesRouter.js');
const loginRouter = require('./routers/loginRouter.js');
const signupRouter = require('./routers/signupRouter.js');
const aiRouter = require('./routers/aiRouter.js');


const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/notes', notesRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/summary', aiRouter);
app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      const errorObj = Object.assign({}, defaultErr, err);
      console.log(errorObj.log);
      return res.status(errorObj.status).json(errorObj.message);
})
app.use('*', (req, res) => {
    res.status(404).send();
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});