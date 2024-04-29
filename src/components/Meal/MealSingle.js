import React from "react";
import "./Meal.scss";
import {
  FaUtensilSpoon,
  FaUserTie,
  FaHeart,
  FaBookmark,
  FaShareSquare,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
import { BASE_URL, MEAL_THUMBNAIL_URL } from "../../utils/constants";

const MealSingle = ({ meal }) => {
  
  const instructions = meal?.steps?.map(step => step.description) || [];

   const mealThumbnail = BASE_URL + MEAL_THUMBNAIL_URL + meal?.thumbnail;


  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="breadcrumb bg-orange text-white">
          <ul className="flex align-center my-2">
            <li className="breadcrumb-item">
              <Link to="/" className="flex align-center">
                <AiFillHome size={22} />
              </Link>
            </li>
            <li className="flex align-center mx-1">
              <BiChevronsRight size={23} />
            </li>
            <li className="breadcrumb-item flex">
              <span to="" className="fs-15 fw-5 text-uppercase">
                {meal?.name}
              </span>
            </li>
          </ul>
        </div>

        <div className="sc-title">Meal Details</div>
        <section className="sc-details bg-white">
          <div className="details-head grid">
            <div className="details-img">
              <img src={mealThumbnail} alt={meal?.name} className="img-cover" />
            </div>

            <div className="details-intro">
              <h2 className="text-orange">{meal?.name}</h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaUserTie className="text-orange" />
                <h4
                  className="text-orange"
                  style={{
                    fontSize: "1em",
                    fontWeight: "normal",
                    marginLeft: "10px",
                  }}
                >
                  {meal?.user?.username}
                </h4>
              </div>
              <p className="title"> </p>
              <div className="py-4">
                <div className="category flex align-center">
                  <span className="text-uppercase fw-8 ls-1 my-1">
                    category: &nbsp;
                  </span>
                  <span className="text-uppercase ls-2">
                    {meal?.category?.name}
                  </span>
                </div>
              </div>

              <div className="button-group flex-container">
                <button className="btn btn-red btn-content">
                  <FaHeart className="icon" /> Like
                </button>
                <button className="btn btn-red btn-content">
                  <FaBookmark className="icon" /> Bookmark
                </button>
                <button className="btn btn-red btn-content">
                  <FaShareSquare className="icon" /> Share
                </button>
              </div>

              <div className="my-5 px-3 py-3 justified-text">
                {meal?.description}
              </div>
            </div>
          </div>

          <div className="details-body">
            <div className="measures my-4">
              <h6 className="fs-16">Ingredients:</h6>
              <ul className="grid">
                { meal?.ingredients?.map((ingredient, id) => (
                  <li key={id} className="fs-14 flex align-end">
                    <span className="li-icon fs-12 text-orange">
                      <FaUtensilSpoon />
                    </span>
                    <span className="li-text fs-15 fw-6 op-09">
                      {ingredient.name}: {ingredient.quantity} {ingredient.type}
                    </span>
                  </li>
                )) }
              </ul>
            </div>

            <div className="instructions my-4">
              <h6 className="fs-16">Instructions:</h6>
              <ol className="grid">
                {instructions.map((instruction, idx) => (
                  <li key={idx} className="fs-14">
                   
                    <span className="li-text fs-16 fw-5 op-09">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MealSingle;
