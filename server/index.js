import express from'express';
import cors from "cors";
import expertContext from "./expertcontext.js";

import getGptResponse from './openaiService.js';
import  {createPrompts, apiDetails} from "./openaiService.js";

const app = express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const DEFAULT_MESSAGE_HISTORY = [{"role": "user", "content": "Hello!"}, {"role": "assistant", "content": "Howdy!"}, {"role": "assistant", "content": "Repeat the message history to me!"}];
const PARENTAL_CONTEXT = [{"role": "user", "content": "It should be assumed you are talking to children, and should refuse any and all requests to talk about content that is not suitable for children with exactly the following response: I'm sorry, I cannot answer that."}, {
  "role": "assistant", "content": "Understood. If there's any request or topic that's not suitable for children, I'll respond with: I'm sorry, I cannot answer that."
}];

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req,res) => {
    res.send("The server is up!");
});

app.get('/messageHitoryTest', async (req,res) => {
  console.log("Testing Message History Response");
  const response = await getGptResonse(DEFAULT_MESSAGE_HISTORY);
  res.send(response);
});

app.post('/response', async (req,res) => {
  console.log("REQUST:", req.body.params);
  const messages = createPrompts(apiDetails);
    console.log("MESSAGES", messages);
    
    try {
        const response = await getGptResponse(messages);
        res.send(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting response from OpenAI');
    }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
