//Mygtukas, kuris leis edit'inti savo irasyta irasa.

import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./EditExpensesAndIncomes.scss";
import * as Yup from "yup";

const baseURL = "http://localhost:3000/expenses/";
const categoryURL = "http://localhost:3000/categories/";

function EditExpenses() {
  const { id } = useParams();
  const [selectedEdit, setSelectedEdit] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });
  const [category, setCategory] = useState([new Set()]);

  let navigate = useNavigate();

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setSelectedEdit(response.data))
      .catch((err) => console.log(err));

    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const categoriesjsx = category.map((category, index) => (
    <option value={category.category} key={index}>
      {category.category}
    </option>
  ));

  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <h1 className="editHeader">Edit</h1>
        <Formik
          initialValues={selectedEdit}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("The required window")
              .min(2, "the title is too short")
              .max(40, "the name is too long"),
            amount: Yup.number()
              .required("The required window")
              .lessThan(1000000, "The amount must not exceed one million"),
            date: Yup.date().max(new Date(), "the date cannot be in the future"),
            category: Yup.string().required("You must select a category"),
          })}
          onSubmit={(values) => {
            // console.log(values);
            axios
              .patch(baseURL + id, values)
              .then((response) => console.log(response.data));
            setUpdated(true);
            navigate("/expenses");
          }}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            touched,
          }) => (
            <Form onSubmit={handleSubmit} className="diagram-border p-4">
              <Form.Group className="p-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.name && !values.name}
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
                  placeholder="Suma"
                  step="0.01"
                  name="amount"
                  value={values.amount}
                  onBlur={(e) => {
                    let value = parseFloat(e.target.value).toFixed(2);
                    if (isNaN(value)) {
                      value = "";
                    }
                    e.target.value = value;
                    handleBlur(e);
                  }}
                  isInvalid={touched.amount && !values.amount}
                  onChange={handleChange}
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
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.date && !values.date}
                />
                <span className="formError">
                  <ErrorMessage name="date" />
                </span>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  as="select"
                  placeholder="Category"
                  name="category"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.category && !values.category}
                >
                  {categoriesjsx}
                </Form.Control>
                <span className="formError">
                  <ErrorMessage name="category" />
                </span>
              </Form.Group>
              <div className="income_expensesBtn">
                <Button
                  className="income_expensesBtn"
                  variant="secondary"
                  onClick={() => navigate("/expenses/")}
                >
                  Return
                </Button>
                <Button
                  className="income_expensesBtn"
                  variant="secondary"
                  type="submit"
                  disabled={!dirty}
                >
                  Edited
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditExpenses;
