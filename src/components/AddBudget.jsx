import { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { postData } from "../../services/api";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
// import { useParams } from "react-router-dom";

const budgetURL = "http://localhost:3000/budget/";
const categoryURL = "http://localhost:3000/categories/";
function AddBudget() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState();
  const [category, setCategory] = useState([new Set()]);
  useEffect(() => {
    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);
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
            category: "",
            limit: ""
          }}
          validationSchema={
            Yup.object({
              limit: Yup.number()
              .required("The required window")
              .lessThan(1000000, "The limit should not exceed one million"),
              category: Yup.string()
              .required("The required window")
              .max(25, "The title is too long")
            })
          }
          onSubmit={(values, { resetForm }) => {
            axios
            .post(budgetURL, values)
            .then((response) => console.log(response.data));
            console.log(values);
            resetForm();
            setSubmitted(true);
          }}
          enableReinitialize
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
              {submitted && (<h4 style={{color: "orange"}}>Available!</h4>)}
              <Form.Group className="p-2">
                <Form.Label>Limit</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="number"
                  placeholder="limit"
                  name="limit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.limit}
                  isInvalid={touched.limit && !values.limit}
                  maxLength={50}
                />
                <span className="formError">
                <ErrorMessage name="limit" />
                </span>
              </Form.Group>          
              <Form.Group className="p-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="incomes_expensesFields select-dark"
                  name="category"
                  onChange={handleChange}
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
                <Button variant="primary" onClick={() => navigate("/budget/")}>
                  List of budgets
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
        </>
     );
}

export default AddBudget;