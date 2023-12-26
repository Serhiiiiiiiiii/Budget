import { Link } from "react-router-dom";
import Vector from "./../assets/images/Vector.svg";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { deleteHandler } from "./servicces/deleteHandler";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const budgetURL = "http://localhost:3000/budget/";
function ReadBudget() {
  const navigate = useNavigate();
  const [budgetData, setbudgetData] = useState([]);
  useEffect(() => {
    axios
      .get(budgetURL)
      .then((response) => setbudgetData(response.data))
      .catch((error) => console.log(error));
  }, []);
  function deleteBudget(id) {
    axios
      .delete(budgetURL + "/" + id)
      .then((response) => {
        setbudgetData(budgetData.filter((expense) => expense._id !== id));
      })
      .catch((error) => console.log(error));
      
  }
  const currentDate = new Date();
  let budgetjsx = budgetData.filter(budget => new Date(budget.expirationDate) > currentDate).map((budget, index) => {
    return (
      <div className="card" key={index}>
          <div className="cardInfoWrapper">
              <div>{budget.category}</div>
              <div id="budgetLimit">{budget.limit} €</div>
          </div>
          <div className="ButtonsContainer">
          <div className="buttonIcons">
          </div>
          <div className="buttonIcons">
            <Link to={"/editbudget/" + budget._id} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
          <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(budget, deleteBudget);
              }}
            />
          </div>
        </div>
        </div>
    )
  })
    return ( 
        <>
        <div style={{width: "100%"}} className="readExpensejsx">
      <div className="cardsWrapper">
        <div className="cardsContainerBorder">
          <div className="cardsContainer cardsContainer1 overflowHidden">
            {budgetjsx}
          </div>
        </div>
        <div className="budgetBtnContainer">
          <Link to="/budgetgraph/">
            <Button
              className="budgetBtn"
            >
              Budget diagram
            </Button>
          </Link>
        </div>
        <div className="LinkWrapper">
          <Link to="/addbudget/" className="LinkButton">
            <button className="buttonAdd">
              <img src={Vector} alt="add" />
            </button>
          </Link>
        </div>
      </div>
    </div>
        </>
     );
}

export default ReadBudget;