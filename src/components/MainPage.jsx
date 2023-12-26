//PAGRINDINIS PUSLAPIS, KURIS KEICIASI PRIKLAUSOMAI NUO PASPAUSTO MYGTUKO - DASHBOARD, INCOMES AR EXPENSES
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button } from "react-bootstrap";
import Navigation from "./Navigation";
import { BurgerIcon, NavigationLogo } from "./NavIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import useWindowSize from "./useWindowSize";

function MainPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let windowSize = useWindowSize();

  return (
    <div className="cntr">
      <div className="navigation-topbar d-flex flex-row justify-content-between p-1 show-onMobile">
        <Button className="burger-button" onClick={handleShow}>
          <BurgerIcon />
        </Button>
        <NavigationLogo />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        onClick={handleClose}
        responsive="md"
      >
        <Offcanvas.Body>
            <Navigation />
          {windowSize >= 768 && <Outlet />}
        </Offcanvas.Body>
      </Offcanvas>
      {windowSize < 768 && <Outlet />}
    </div>
  );
}

export default MainPage;
