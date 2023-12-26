const mongoose = require("mongoose");
const Book = require("./../models/bookModel");

exports.getBooks = (req, res) => {
  Book.find(req.query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.postBook = (req, res) => {
  // console.log(req.body)
  // const {bookTitle, bookAuthor, bookYear, bookAvail} = req.body        <---------- LEGIT WAY
  Book.create(req.body) // <---------------- BAD BAD
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.getBookByID = (req, res) => {
  let { id } = req.params;
  Book.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.editBook = (req, res) => {
  let { id } = req.params;
  Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.deleteBook = (req, res) => {
  let { id } = req.params;
  Book.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};
