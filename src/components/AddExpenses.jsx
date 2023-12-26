//ISLAIDU PUSLAPIS. JAME GRAFIKAS RODANTIS VISU METU ISLAIDU SUMA SUSKIRSTYTAS PAGAL MENESIUS IR SALIA PIRKIMU ISTORIJA (TIK ISLAIDOS)
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/api";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const expenseURL = "http://localhost:3000/expenses";
const budgetURL = "http://localhost:3000/budget/";
const categoryURL = "http://localhost:3000/categories/";

function AddExpenses() {
  const [submitted, setSubmitted] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  // const [category, setCategory] = useState([]);
  const [category, setCategory] = useState([new Set()]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(expenseURL)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Помилка при завантаженні даних про витрати:", error));

    axios
      .get(budgetURL)
      .then((response) => setBudgets(response.data))
      .catch((error) => console.error("Помилка при завантаженні даних про бюджет:", error));

    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  const getCategoryBudgetLimit = (category) => {
    // Get the budget limit for a specific category from budgets data
    const budget = budgets.find((budget) => budget.category === category);
    return budget ? budget.limit : 0;
  };
  const calculateTotalExpenseAmount = () => {
    // Calculate total sum of expenses amounts
    let totalAmount = 0;
    // expenses.forEach((expense) => {
    //   totalAmount += parseFloat(expense.amount);
    // });
    expenses.forEach((expense) => {
      if (expense.category === selectedCategory) {
        totalAmount += parseFloat(expense.amount);
      }
    });
    return totalAmount;
  };
  const handleCategoryChange = (event) => {
    // Update selectedCategory state with selected category from form
    setSelectedCategory(event);
    console.log(selectedCategory);
  };
  const handleExpenseAmountChange = (event) => {
    // Update expenseAmount state with entered expense amount from form
    setExpenseAmount(parseFloat(event));
    console.log(expenseAmount);
  };

  const categoriesjsx = category.map((category, index) => (
    <option value={category.category} key={index}>
      {category.category}
    </option>
  ));

  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={{
            name: "",
            amount: "",
            date: new Date().toISOString().slice(0, 10),
            category: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("The required window")
              .min(2, "The title is too short")
              .max(40, "The title is too short"),
            amount: Yup.number()
              .required("The required window")
              .lessThan(1000000, "The amount must not exceed one million"),
            date: Yup.date().max(new Date(), "the date cannot be in the future"),
            category: Yup.string().required("You must select a category"),
          })}
          onSubmit={(values, { resetForm }) => {
            postData(values, expenseURL);
            console.log(values);
            resetForm();
            setSubmitted(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            isSubmitting,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              
              {submitted && <h4 style={{ color: "orange" }}>Available!</h4>}
              {selectedCategory && expenseAmount > 0 && (
                <div style={{ color: "red" }}>
                  {getCategoryBudgetLimit(selectedCategory) > 0 && calculateTotalExpenseAmount(selectedCategory) +
                    expenseAmount >
                    getCategoryBudgetLimit(selectedCategory) && (
                    <div>
                      The total cost for {selectedCategory} exceeds
                      budget limit
                    </div>
                  )}
                </div>
              )}
              <Form.Group className="p-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !values.name}
                  maxLength={50}
                />
                <span className="formError">
                  <ErrorMessage name="name" />
                </span>
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Label>Sum</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="number"
                  step="0.01"
                  placeholder="Suma"
                  name="amount"
                  onChange={(e) => {
                    handleChange(e);
                    handleExpenseAmountChange(e.target.value);
                  }}
                  onBlur={(e) => {
                    let value = parseFloat(e.target.value).toFixed(2);
                    if (isNaN(value)) {
                      value = "";
                    }
                    e.target.value = value;
                    handleBlur(e);
                  }}
                  value={values.amount}
                  isInvalid={touched.amount && !values.amount}
                />
                <span className="formError">
                  <ErrorMessage name="amount" />
                </span>
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="date"
                  placeholder="YY-MM-DD"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  isInvalid={touched.date && !values.date}
                />
                <span className="formError">
                  <ErrorMessage name="date" />
                </span>
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="incomes_expensesFields select-dark"
                  name="category"
                  onChange={(e) => {
                    handleChange(e);
                    handleCategoryChange(e.target.value);
                  }}
                  onBlur={handleBlur}
                  value={values.category}
                  isInvalid={touched.category && !values.category}
                >
                  <option value="">Select a category</option>
                  {categoriesjsx}
                </Form.Control>
                <span className="formError">
                  <ErrorMessage name="category" />
                </span>
              </Form.Group>

              <div className="income_expensesBtn">
                <Button
                  className="income_expensesBtn"
                  type="button"
                  onClick={resetForm}
                  disabled={!dirty || isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  className="income_expensesBtn"
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/expenses/")}
                >
                  List of expenses
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddExpenses;
