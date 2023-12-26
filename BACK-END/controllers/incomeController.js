const mongoose = require("mongoose");
const Income = require("./../models/incomeModel");

exports.getIncomes = (req, res) => {
  const year = req.query.year;
  let query = {userID: req.userID};
  if (year) {
    const yearRegex = new RegExp(`^${year}`);
    query.date = { $regex: yearRegex };
  }
  Income.find(query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.getIncomeById = (req, res) => {
  let { id } = req.params;
  Income.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.postIncome = (req, res) => {
  let { name, date, amount, category } = req.body;
  let income = new Income({
    name: name,
    date: date,
    amount: amount,
    category: category,
    userID : req.userID
  });
  income.save().then((doc) => {
    req.logger.info(`User added income`);
    res.status(200).json(doc);
  });
};

exports.editIncome = (req, res) => {
  let { id } = req.params;
  Income.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      req.logger.info(`User edited income`);
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.deleteIncome = (req, res) => {
  let { id } = req.params;
  Income.findByIdAndDelete(id)
    .then((doc) => {
      req.logger.info(`User deleted income`);
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};
