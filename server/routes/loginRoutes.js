const loginRouter = require("express").Router();
const controller = require("../controllers/auth");

loginRouter.post("/user", controller.postNewUser);
loginRouter.get("/user/:auth_key", controller.getUser);
// loginRouter.get("/test", controller.testRoute);
module.exports = loginRouter;
