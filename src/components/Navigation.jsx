//ALL NAVIGATION. THE CONTENT WILL CHANGE BETWEEN THEM, DEPENDING ON WHETHER THE USER IS LOGGED IN OR NOT
//IF LOGGED IN = TRUE, TADA RODOME NavMainButtons ir NavLogoutButton, IF LOGGED IN = FALSE, RODOME NavLoginForm

import { NavigationLogo, NavUserLogo, NavLogoutButton } from "./NavIcons";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navigation() {
  const { getLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/getName")
      .then((res) => setUserData(res.data))
      .catch((error) => console.log(error));
  }, []);

  const logOut = async () => {
    await axios.get("http://localhost:3000/users/logout");
    getLoggedIn();
  };

  return (
    <>
      <div className="nav__background--color pt-5">
        <div className="d-flex justify-content-center">
          <NavigationLogo />
        </div>
        <div className="mt-1 d-flex flex-column justify-between gap-5">
          <div id="navButtons" className="w-75 mx-auto">
            <Link to="/" className="mb-2 w-50 mx-auto text-decoration-none">
              <Button className="w-100 mx-auto gradient-class">
                Home
              </Button>
            </Link>
            <Link
              to="/incomes/"
              className="mb-2 w-50 mx-auto text-decoration-none"
            >
              <Button className="w-100 mx-auto gradient-class">Income</Button>
            </Link>
            <Link
              to="/expenses/"
              className="mb-2 w-50 mx-auto text-decoration-none"
            >
              <Button className="w-100 mx-auto gradient-class">Expenses</Button>
            </Link>
            <Link
              to="/budget/"
              className="mb-2 w-50 mx-auto text-decoration-none"
            >
              <Button className="w-100 mx-auto gradient-class">
                Budget
              </Button>
            </Link>
            {isAdmin && (
              <>
                <Link
                  to="/categorycreate/"
                  className="mb-2 w-50 mx-auto text-decoration-none"
                >
                  <Button className="w-100 mx-auto gradient-class">
                    Categories
                  </Button>
                </Link>
                <Link
                  to="/users/"
                  className="mb-2 w-50 mx-auto text-decoration-none"
                >
                  <Button className="w-100 mx-auto gradient-class">
                    Customers
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="container__Bottom--Margin">
          <div className="user-logo">
            <NavUserLogo />
            <span className="user-profile">{userData.name}</span>
          </div>
          <button className="logout-button" onClick={logOut}>
            <NavLogoutButton />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
