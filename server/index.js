const express = require('express');
const path = require('path');
const router = require('./routes');
const morgan = require('morgan');
const fs = require('fs');
const { formatDistanceToNow } = require('date-fns');
require('dotenv').config();
const pool = require('./database');

// basic server
const app = express();
app.use(express.json());

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('tiny', { stream: accessLogStream }));
const myLogger = (req, res, next) => {
  console.log(`A ${req.method} request was made to the ${req.url} endpoint`);
  if (req.body && Object.keys(req.body).length) {
    console.log(`with a payload of ${JSON.stringify(req.body)}`);
  }
  next();
};
app.use(myLogger);


app.post('/test', (req, res) => {
  pool.query("INSERT INTO users (username, email, bio, profile_photo_url, auth_key) VALUES ($1, $2, $3, $4, $5);", [req.body.username, req.body.email, req.body.bio, req.body.profile_photo_url, req.body.auth_key])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.get('/test', (req, res) => {
  pool.query("SELECT now();")
    .then(resp => console.log(formatDistanceToNow(resp.rows[0].now)))
})
// routers go here
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
*/

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening on ${port}`)
    console.log(`successfully connected at http://${process.env.HOST || 'localhost'}:${port}`)
  }
})

