const express = require("express");
const categoryController = require("./../controllers/categoryController");
const {userLoggerMiddleware} = require("./../middleware/logger");
const categoryRouter = express.Router();
const auth = require("./../middleware/auth")

categoryRouter
  .route("/")
  .get(categoryController.getCategory)
  .post(auth, userLoggerMiddleware, categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategorybyId)
  .patch(auth, userLoggerMiddleware, categoryController.editCategory)
  .delete(auth, userLoggerMiddleware, categoryController.deleteCategory);

module.exports = categoryRouter;
