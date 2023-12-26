import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReadExpense.scss";
import Vector from "./../assets/images/Vector.svg";
import { deleteHandler } from "./servicces/deleteHandler";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import Papa from "papaparse";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categoryURL = "http://localhost:3000/categories/";
const expensesURL = "http://localhost:3000/expenses";

function ReadExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState([new Set()]);

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const params = {
      from: fromDate ? fromDate.toISOString() : null,
      to: toDate ? toDate.toISOString() : null,
    };
    axios
      .get(expensesURL, { params })
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log(error));

    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, [fromDate, toDate]);

  function deleteExpense(id) {
    axios
      .delete(expensesURL + "/" + id)
      .then((response) => {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => console.log(error));
  }

  const handleExport = () => {
    const csv = Papa.unparse(expenses, {
      header: true,
    });

    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.setAttribute("download", "expenses.csv");
    link.click();
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (fromDate && expenseDate < fromDate) {
      return false;
    }
    if (toDate && expenseDate > toDate) {
      return false;
    }
    if (selectedCategory && expense.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categoriesOptions = category.map((category, index) => (
    <option value={category.category} key={index}>
      {category.category}
    </option>
  ));
  const handleResetFilters = () => {
    setSelectedCategory("");
    setFromDate(null);
    setToDate(null);
  };

  let expensesjsx = filteredExpenses.map((expense, index) => {
    return (
      <div className="card" key={expense._id}>
        <div className="cardInfoWrapper">
          <div>{expense.name}</div>
          <div>{expense.date.slice(0, 10)}</div>
          <div>
            <b>Категорія: </b> {expense.category}
          </div>
        </div>
        <div className="cardPriceRed">-{expense.amount} €</div>
        <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/expenses/" + expense._id} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(expense, deleteExpense);
              }}
            />
          </div>
        </div>
      </div>
    );
  });
  const TotalAmount = () => {
    const totalAmount = expenses.reduce((acc, item) => acc + item.amount, 0);
    return (
      <>
        <div style={{ color: "white" }}>Сума: -{totalAmount} ₴</div>
      </>
    );
  };
  return (
    <>
      <div className="readExpenseIncomejsx">
        <div className="cardsWrapper">
          <div className="filtersContainer">
            <div className="filterItem">
              <span>Category:</span>
              <br />
              <select
                style={{ width: "150px" }}
                className="customDatePicker"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All categories</option>
                {categoriesOptions}
              </select>
            </div>
            <div className="filterItem">
              <span>From:</span>
              <DatePicker
                className="customDatePicker"
                selected={fromDate}
                onChange={handleFromDateChange}
              />
            </div>
            <div className="filterItem">
              <span>To:</span>
              <DatePicker
                className="customDatePicker"
                selected={toDate}
                onChange={handleToDateChange}
              />
            </div>

            <Button
              style={{ width: "100px" }}
              className="budgetBtn2"
              onClick={handleResetFilters}
            >
              Cancel
            </Button>
          </div>
          {TotalAmount()}
          <div className="cardsContainerBorder">
            <div className="cardsContainer cardsContainer2 overflowHidden">{expensesjsx}</div>
          </div>
          <div className="budgetBtnContainer">
            <Button className="budgetBtn" onClick={handleExport}>
              Export CSV
            </Button>
          </div>
          <div className="LinkWrapper">
            <Link to="/addexpense/" className="LinkButton">
              <button className="buttonAdd">
                <img src={Vector} alt="" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadExpenses;
