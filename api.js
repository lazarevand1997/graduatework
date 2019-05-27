const express = require("express");
const userController = require("./controllers/userController");
const newsController = require("./controllers/newsController");
const eventController = require("./controllers/eventController");
const ticketController = require("./controllers/ticketController");
const jwt =require("jsonwebtoken");
var {SECRET} = require("./config");

let checkToken = (req, secret) => {
  let token = req.headers.authorization;
  var response = {
      status: "error",
      message: "Token couldn`t be verified"
    };
  jwt.verify(token, secret, (err, decoded) => {
        if (err) {
           response = {
            status: "error",
            message: "Token is not valid"
          };
        } else {
          if (token === req.session.access_token) {
             response = {
              status: "success",
              decoded: decoded
            };
          } else {
             response = {
              status: "error",
              message: "Token is not correct (session)"
            };
          }
        }
      });
      return response;
};

var router = express.Router();

router.post("/signup", userController.create);
router.post("/signin", userController.login);

router.get("/showallnews", newsController.readall);
router.get("/showlastnews", newsController.readlast);

router.get("/showallevents", eventController.readall);

router.post("/getticket", ticketController.create);
router.post("/checkticket", ticketController.checkticket);
router.use((req, res, next) => {
  let auth = checkToken(req, SECRET);
  if (auth.status === "error") {
      return res.json({ status: "error", message: "Not Authorized" });
  } else {
    next();
  }
});
router.post("/changepass", userController.changePassword);
router.get("/check", userController.check);
// news
router.post("/addnews", newsController.create);
router.post("/delnews", newsController.delete);
router.post("/updatenews", newsController.change_news);
// events
router.post("/addevent", eventController.create);
router.post("/delevent", eventController.delete);
router.post("/updateevent", eventController.change_event);

module.exports = router;
