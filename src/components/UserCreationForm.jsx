import { useFormik } from "formik";
import { addUser } from "../../services/api";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import useWindowSize from "./useWindowSize";
import Select from "react-select";

function UserCreationForm({ setBeingCreated, setUsers }) {
  const baseURL = "http://localhost:3000/users/";
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let windowSize = useWindowSize();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #008CFF",
      borderRadius: "10px",
      boxShadow: "none",
      backgroundColor: "#0E0E30",
      "&:hover": {
        borderColor: "#008CFF",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "2px solid #008CFF",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#008CFF" : "white",
      color: state.isFocused ? "white" : "#0E0E30",
      "&:hover": {
        backgroundColor: "#008CFF",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#008CFF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#008CFF",
    }),
  };

  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await addUser(baseURL, values);
        await setUsers(prevUsers => [...prevUsers, values]);
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 2000)
        resetForm();
      } catch (error) {
        setError(error.response.data.error);
      }
      console.log(values);
    },
  })
  return (
    <div className={windowSize < 768 ? "admin-panel" : ""}>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="gradient-class"
          style={{ cursor: "text" }}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="gradient-class"
          style={{ cursor: "text" }}
        />
        <div
          style={{ marginLeft: "16px", display: "flex", alignItems: "center" }}
        >
          <span style={{position: "relative"}}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="gradient-class"
              style={{ cursor: "text" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer", position: "absolute", right: "40px", top: "26px" }}
              className="password-icon"
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </span>
        </div>
        <div>
          <Select
            onChange={(value) => formik.setFieldValue("role", value.value)}
            styles={customStyles}
            placeholder="Choose a role"
            options={options}
            name="role"
          ></Select>
        </div>
        <div className="admin-buttons" style={{ flexWrap: "wrap" }}>
          <button
            type="submit"
            className="gradient-class"
            style={{ flex: 1, flexBasis: 0 }}
          >
            Create
          </button>
          <button
            type="button"
            className="gradient-class"
            onClick={formik.handleReset}
            style={{ flex: 1, flexBasis: 0 }}
          >
            Reset
          </button>
          <button
            type="button"
            className="gradient-class"
            onClick={() => setBeingCreated(false)}
            style={{ flexBasis: "100%" }}
          >
            Return
          </button>
        </div>
        {isSubmitted && <div>The user is created</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default UserCreationForm;
