const db = require('../models/noteModel');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  console.log('made it to start session');
    const ssid = res.locals.cookie;
    const query = 'INSERT INTO sessions (session_id) VALUES ($1)';
    const values = [ssid];
    try{
      const result = await db.query(query, values);
      return next();
    }
    catch(err){
      return next({log: 'failed to create session',
        status: 400,
        message: {error: err}
    })
    }
}

sessionController.validateSession = async (req, res, next) => {
    console.log('in validate session');
    const ssid = req.cookies.ssid;
    //console.log(ssid);
    if(!ssid) return next({log: 'you are not logged in',
    status: 400,
    message: {error: 'not logged in'}
    });
    const query = 'SELECT * FROM sessions WHERE session_id = $1'
    const values = [ssid];
    try{
      const result = await db.query(query, values);
      //console.log(result);
      if(result.rows.length > 0) return next();
      else return next({log: 'you are not logged in',
      status: 400,
      message: {error: 'not logged in'}
      });
    }
    catch(err){
      return next({log: 'failed to create session',
        status: 400,
        message: {error: err}
    })
    }

}

module.exports = sessionController;