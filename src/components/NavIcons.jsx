import userLogo from "./../assets/images/user.svg";
import logo from "./../assets/images/logo.svg";
import logout from "./../assets/images/logout.svg";
import burger from "./../assets/images/burger.svg";
import diagram from "./../assets/images/diagram.svg"
import history from "./../assets/images/history.svg"
import expenseButton from "./../assets/images/expenseButton.svg"
import incomeButton from "./../assets/images/incomeButton.svg"
import "bootstrap/dist/css/bootstrap.min.css";


export function NavLogoutButton() {
  return (
    <>
      <img src={logout} alt="Logout Button" />
    </>
  );
}

export function NavUserLogo() {
  return (
    <>
      <img src={userLogo} alt="User Logo" />
    </>
  );
}

export function NavigationLogo() {
  return (
    <div className="d-flex justify-content-center">
      <img src={logo} alt="Logo" className="nav-logo"></img>
    </div>
  );
}

export function BurgerIcon() {
  return <img src={burger} alt="Burgir"></img>;
}

export function DiagramIcon() {
  return <img src={diagram} alt="Diagram Icon"></img>
}

export function HistoryIcon() {
  return <img src={history} alt="History Icon"></img>
}

export function ExpenseIcon() {
  return <img src={expenseButton} alt="Add expense"></img>
}

export function IncomeIcon() {
  return <img src={incomeButton} alt="Add income"></img>
}