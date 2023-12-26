import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("http://localhost:3000/users/loggedIn");
    const userRoleRes = await axios.get("http://localhost:3000/users/getName");
    const userData = userRoleRes.data;
    setLoggedIn(loggedInRes.data);
    if (userData.role === "admin") {
      setIsAdmin(true);
      navigate("/");
    } else {
      setIsAdmin(false);
      navigate("/");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  if (isLoading) {
    return <div>Download...</div>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
// export default AuthContext;
export { AuthContextProvider, AuthContext };
