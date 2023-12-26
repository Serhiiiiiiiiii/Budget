const express = require("express");
const expenseController = require("./../controllers/expenseController");
const expenseRouter = express.Router();
const auth = require("./../middleware/auth")
const {userLoggerMiddleware} = require("./../middleware/logger");

expenseRouter
  .route("/")
  .get(auth, expenseController.getExpenses)
  .post(auth, userLoggerMiddleware, expenseController.postExpense)

expenseRouter
  .route("/:id")
  .patch(auth, userLoggerMiddleware, expenseController.editExpense)
  .delete(auth, userLoggerMiddleware, expenseController.deleteExpense)
  .get(auth, expenseController.getExpenseById)

module.exports = expenseRouter;
 