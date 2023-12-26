const Expense = require("./../models/expenseModel");

exports.getExpenses = (req, res) => {
  const year = req.query.year;
  let query = { userID: req.userID };
  if (year) {
    const yearRegex = new RegExp(`^${year}`);
    query.date = { $regex: yearRegex };
  }
  Expense.find(query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.getExpenseById = (req, res) => {
  let { id } = req.params;
  Expense.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.postExpense = (req, res) => {
  let { name, date, amount, category } = req.body;
  let expense = new Expense({
    name: name,
    date: date,
    amount: amount,
    category: category,
    userID: req.userID,
  });

  expense.save().then((doc) => {
    req.logger.info(`Customer added expenses`);
    res.status(200).json(doc);
  });
};

exports.editExpense = (req, res) => {
  let { id } = req.params;
  Expense.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      req.logger.info("Customer edited expenses");
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.deleteExpense = (req, res) => {
  let { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then((doc) => {
      req.logger.info("Customer deleted expenses");
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};
