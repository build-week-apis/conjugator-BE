require('dotenv').config();
const session = require('express-session');
const db_auth = require('./data/db_auth');
const db_words = require('./data/db_words')
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// endpoints here
const port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


server.get("/api/words",
  (req,res) => { db_words.getNewWord()
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json({error: err, message: "could not gather from database"}))
  });

server.get("/api/users/:id",
  (req,res) => { db_auth.find(req.headers.token, req.params.id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json({error: err, message: "could not gather from database"}))}
);

server.get("/api/users/",
(req,res) => 
db_auth.find(req.headers.token)
.then(result => res.status(200).json(result))
.catch(err => res.status(400).json({error: err, message: "could not gather from database"}))
);

server.post("/api/register",
  (req,res,next) =>
  {
  db_auth.userExists(req.body.username).then(() => 
  {
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.exec(req.body.password))
      return res.status(400).json({error: "bad password", message: "password must contain 8 characters and have one upper, one lower, and one number"});
    db_auth.register(req.body.username, req.body.password)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({error: err, message: "interal error"}))
  }
  ).catch(err => res.status(400).json({error: err, message: "username is already in use"}))
  }
);

server.post("/api/login",
  (req,res,next) => 
  db_auth.login(req.body.username, req.body.password)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => res.status(400).json({error: err, message: "incorrect username or password"}))
);

server.get("/api/logout", (req,res) =>
{
  res.send("logout")
});


function logger(req,res,next)
  {
    console.log(`${req.method} is being used at ${req.url} at ${Date.now()} ${res.body && (res.method === "post" || res.method === "put") `with ${res.body} data`}`);
    next();
  }