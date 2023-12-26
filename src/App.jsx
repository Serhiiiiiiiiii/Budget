import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReadIncomes from "./components/ReadIncomes";
import AddExpenses from "./components/AddExpenses";
import ReadExpenses from "./components/ReadExpenses";
import AddIncomes from "./components/AddIncomes";
import EditExpenses from "./components/EditExpenses";
import EditIncomes from "./components/EditIncomes";
import EditBudget from "./components/EditBudget";
import Budget from "./components/ReadBudget";
import BudgetGraph from "./components/BudgetGraph";
import Users from "./components/Users";

import CategoryCreate from "./components/CategoryCreate";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";

import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";

import AddBudget from "./components/AddBudget";

import axios from "axios";
import {AuthContext} from "./context/AuthContext";
import { useContext } from "react";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn, isAdmin } = useContext(AuthContext);

  return (

      <Layout>
        <Routes>
          {loggedIn ? (
            <Route path="/" element={<MainPage />}>
              <Route path="addIncomes" element={<AddIncomes />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="expenses" element={<ReadExpenses />} />
              <Route path="incomes" element={<ReadIncomes />} />
              <Route path="addexpense" element={<AddExpenses />} />
              <Route path="expenses/:id" element={<EditExpenses />} />
              <Route path="incomes/:id" element={<EditIncomes />} />
              <Route path="editbudget/:id" element={<EditBudget />} />
              <Route path="addbudget" element={<AddBudget />} />

            <Route path="budget" element={<Budget />} />
            <Route path="budgetgraph" element={<BudgetGraph />} />
            {isAdmin && (
              <>
                <Route path="categorycreate" element={<CategoryCreate />} />
                <Route path="addcategory" element={<AddCategory />} />
                <Route path="categories/:id" element={<EditCategory />} />
                <Route path="users" element={<Users />} />
              </>
            )}
          </Route>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="/signup" element={<RegisterForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
