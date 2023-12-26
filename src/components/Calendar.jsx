import { useState, useEffect } from "react";
import axios from "axios";
import "./Calendar.css";
import { IconHistory } from "./HistoryIcons";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { deleteHandler } from "./servicces/deleteHandler";
import { Link } from "react-router-dom";

const expensesURL = "http://localhost:3000/expenses";
const incomesURL = "http://localhost:3000/incomes";

function Calendar() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const expenseSign = expenses.map((income) => {
    return {
      ...income,
      amount: "- " + income.amount + " €",
    };
  });

  const incomeSign = incomes.map((expense) => {
    return {
      ...expense,
      amount: "+ " + expense.amount + " €",
    };
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [incomesResponse, expensesResponse] = await Promise.all([
        axios.get(incomesURL),
        axios.get(expensesURL),
      ]);
      setIncomes(incomesResponse.data);
      setExpenses(expensesResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAllData(id) {
    try {
      await Promise.all([
        axios.delete(incomesURL + "/" + id),
        axios.delete(expensesURL + "/" + id),
      ]);
      setIncomes(incomes.filter((income) => income._id !== id));
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const allData = [...incomeSign, ...expenseSign].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const transferjsx = allData.map((transfer) => {
  
    return (
      <div className="historyCard" key={transfer._id}>
        <div className="historyInfo">
          <div className="cardInfo">
            <IconHistory />
            <div className="transferInfo">
              <h2 className="transferName">{transfer.name}</h2>
              <p className="transferDate">{transfer.date}</p>
            </div>
          </div>
          <p className={transfer.amount[0] === "+" ? "greenClass" : "redClass"}>
            {transfer.amount}</p>
        </div>
  
        <div className="transferButtons">
          <div className="buttonIcons">
            <Link
              to={transfer.amount > 0 ? "/incomes/" + transfer._id : "/expenses/" + transfer._id}
              className="buttonIcons"
            >
              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(transfer, deleteAllData);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="historyTab">
      <h1>History</h1>
      <div>{transferjsx}</div>
    </div>
  );
}

export default Calendar;