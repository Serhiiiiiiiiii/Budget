import { useFormik } from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.scss';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function RegisterForm() {
  const registerURL = 'http://localhost:3000/users/signup';
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { getLoggedIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post(registerURL, values);
        getLoggedIn();
      } catch (error) {
        setError(error.response.data.error);
      }
    },
  });
  return (
    <div className='loginPage'>
      <h3>Registration</h3>
      <form onSubmit={formik.handleSubmit} className='loginForm'>
        <input
          type='text'
          className='loginInput'
          placeholder='Name'
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <input
          type='email'
          className='loginInput'
          placeholder='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <span style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            className='loginInput'
            placeholder='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '40px',
              top: '26px',
            }}
            className='password-icon'
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        </span>
        <button type='submit' className='gradient-class'>
          Sign up
        </button>
        <Link to='/' className='backLink'>
          Return
        </Link>
      </form>
      <div className='error'>
        {error}
      </div>
    </div>
  );
}

export default RegisterForm;
