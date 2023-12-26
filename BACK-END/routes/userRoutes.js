const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const auth = require("./../middleware/auth");
const {
  signupLoggerMiddleware,
  loginLoggerMiddleware,
  logoutLoggerMiddleware,
  userLoggerMiddleware,
} = require("./../middleware/logger");

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(auth, userLoggerMiddleware, userController.createUser);

userRouter
  .route("/:id")
  .patch(auth, userLoggerMiddleware, userController.editUser)
  .delete(auth, userLoggerMiddleware, userController.deleteUser);

userRouter
.route("/signup")
.post(userController.signup, signupLoggerMiddleware);

userRouter
.route("/login")
.post(userController.login, loginLoggerMiddleware);

userRouter
  .route("/logout")
  .get(auth, userController.logout, logoutLoggerMiddleware);

userRouter
.route("/loggedIn")
.get(userController.loggedIn);

userRouter
.route("/getName")
.get(userController.getName);

module.exports = userRouter;
