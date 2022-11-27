const express = require("express");
// const https = require("https");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const { formatDistanceToNow } = require("date-fns");
require("dotenv").config();
const router = require("./routes");
const videoRouter = require("./routes/video");
const loginRouter = require("./routes/loginRoutes");
const videosRouter = require("./routes/videos");
const pool = require("./database");
const usersRouter = require("./routes/users");
const followsRouter = require("./routes/follows");

// basic server
const app = express();
app.use(express.json());

// CORS
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
app.use(morgan("tiny", { stream: accessLogStream }));
const myLogger = (req, res, next) => {
  console.log(`A ${req.method} request was made to the ${req.url} endpoint`);
  if (req.body && Object.keys(req.body).length) {
    console.log(`with a payload of ${JSON.stringify(req.body)}`);
  }
  next();
};
app.use(myLogger);

app.post("/test", (req, res) => {
  pool
    .query(
      "INSERT INTO users (username, email, bio, profile_photo_url, auth_key) VALUES ($1, $2, $3, $4, $5);",
      [
        req.body.username,
        req.body.email,
        req.body.bio,
        req.body.profile_photo_url,
        req.body.auth_key,
      ]
    )
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// routers go here
app.use("/video", videoRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);
app.use("/follows", followsRouter);
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

const port = process.env.PORT || 4000;
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening on 3000`);
    console.log(
      `successfully connected at http://${process.env.HOST || "localhost"}:3000`
    );
  }
});
// https
//   .createServer(
//     {
//       key: fs.readFileSync("key.pem"),
//       cert: fs.readFileSync("cert.pem"),
//     },
//     app
//   )
//   .listen(port, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`server listening on ${port}`);
//       console.log(
//         `successfully connected at http://${
//           process.env.HOST || "localhost"
//         }:${port}`
//       );
//     }
//   });
