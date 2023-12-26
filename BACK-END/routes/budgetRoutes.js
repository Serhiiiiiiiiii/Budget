const express = require("express");
const budgetController = require("./../controllers/budgetController");
const budgetRouter = express.Router();
const auth = require("./../middleware/auth");
const {userLoggerMiddleware} = require("./../middleware/logger");

budgetRouter
  .route("/")
  .get(auth, budgetController.getBudgets)
  .post(auth, userLoggerMiddleware, budgetController.createBudget);

budgetRouter
  .route("/:id")
  .patch(auth, userLoggerMiddleware, budgetController.editBudget)
  .delete(auth, userLoggerMiddleware, budgetController.deleteBudget)
  .get(auth, budgetController.getBudgetById);

module.exports = budgetRouter;
