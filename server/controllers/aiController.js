
const {OpenAI} = require("openai");
const dotenv = require('dotenv');
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

//const configuration = Configuration();
const openai = new OpenAI({ apiKey: OPENAI_API_KEY});
  
const summarize = async (text) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: 'user', content: `Summarize the following text in 4 sentences: ${text}`}],
      });
    return completion.choices[0].message.content;
}

const aiController = {};

aiController.getSummary = async (req, res, next) => {
  console.log('going to get a summary');
  res.locals.summary = await summarize(req.body.text);
  if(res.locals.summary){
    return next();
  }
  else return next({error: {err: 'didnt get your summary'}});
  
}

module.exports = aiController;