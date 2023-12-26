const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The title is required"],
  },
  date: String,
  amount: Number,
  category: {
    type: String
  },
  userID: String
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
