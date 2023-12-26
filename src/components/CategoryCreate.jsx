import { useEffect, useState } from 'react';
import axios from 'axios';
import './BudgetChart.scss';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './ReadExpense.scss';
import Vector from './../assets/images/Vector.svg';
import { deleteHandler } from "./servicces/deleteHandler";

const categoryURL = 'http://localhost:3000/categories';

function CategoryCreate() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(categoryURL)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  function deleteCategory(id) {
    axios
      .delete(categoryURL + '/' + id)
      .then((response) => {
        setCategory(category.filter((category) => category._id !== id));
      })
      .catch((error) => console.log(error));
  }

  let categoryJSX = category.map((category) => {
    return (
      <div className="card" key={category._id}>
        <div className="cardInfoCategory">
          <h2>{category.category}</h2>
        </div>
        <div className="ButtonsContainer">
          <div className="buttonIcons">
            <Link to={"/categories/" + category._id} className="buttonIcons">
              <RiEdit2Line size={30} />
            </Link>
          </div>
          <div className="buttonIcons">
            <RiDeleteBinLine
              size={30}
              onClick={() => {
                deleteHandler(category, deleteCategory);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="readExpenseIncomejsx">
        <div className="cardsWrapper">
          <div className="cardsContainerBorder">
            <div className="cardsContainer cardsContainer1 overflowHidden">{categoryJSX}</div>
          </div>
          <div className="LinkWrapper">
            <Link to="/addcategory/" className="LinkButton">
              <button className="buttonAdd">
                <img src={Vector} alt="" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;