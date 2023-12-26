// Import dependencies
import { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postData } from "../../services/api";

// Set the URL for creating a category
const categoryURL = "http://localhost:3000/categories";

function AddCategory() {
  // Define state variables
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Render the component
  return (
    <>
      <div className="incomes_expenses__background--color incomes_expenses-onMobile">
        <Formik
          initialValues={{
            category: "",
          }}
          validationSchema={Yup.object({
            category: Yup.string()
              .required("The required window")
              .min(2, "The title is too short")
              .max(40, "The title is too long"),
          })}
          onSubmit={(values, { resetForm }) => {
            postData(values, categoryURL);
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
              {/* Show a success message if the form has been submitted */}
              {submitted && (
                <h4 style={{ color: "orange" }}>Created a category!</h4>
              )}

              {/* Form fields */}
              <Form.Group className="p-2">
                <Form.Label>Category title</Form.Label>
                <Form.Control
                  className="incomes_expensesFields"
                  type="text"
                  placeholder="Category name"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  isInvalid={touched.category && !!errors.category}
                  maxLength={50}
                />
                <span className="formError">
                  <ErrorMessage name="category" />
                </span>
              </Form.Group>

              {/* Form buttons */}
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
                  onClick={() => navigate("/categorycreate/")}
                >
                  Categories
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

// Export the component
export default AddCategory;
