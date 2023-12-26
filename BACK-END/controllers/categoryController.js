const Category = require("../models/categoryModel");

exports.getCategory = (req, res) => {
  try {
    Category.find(req.query)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.status(404).json({ error: `Failed request` }));
  } catch {
    res.status(500).json({ error: "The request failed, please try again" });
  }
};

exports.getCategorybyId = (req, res) => {
  let { id } = req.params;
  Category.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.createCategory = (req, res) => {
  const { category } = req.body;

  try {
    Category.findOne({ category: category }).then((existingCategory) => {
      if (existingCategory) {
        res.status(422).json({ error: "The category already exists" });
      } else {
        const createdCategory = new Category({
          category,
        });

        createdCategory
          .save()
          .then((doc) => {
            req.logger.info('The administrator has created a category')
            res.status(201).json(doc);
          })
          .catch((err) => res.status(404).json({ error: err.message }));
      }
    });
  } catch {
    res
      .status(500)
      .json({ error: "Category creation failed, try again later" });
  }
};

exports.editCategory = (req, res) => {
  let { id } = req.params;
  Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      req.logger.info("The administrator edited the category")
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.deleteCategory = (req, res) => {
  let { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((doc) => {
      req.logger.info("The administrator deleted the category")
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};
