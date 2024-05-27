import React, { useEffect, useState } from "react";
import MealList from "./MealList";
import axios from "axios";
import AddMealForm from "./AddMealForm";
import { useMealContext } from "../../context/mealContext";
import { startFetchSingleUserMeals } from "../../actions/mealsActions";
import { useParams } from "react-router-dom";

const BookmarkedMeals = () => {
  const { id } = useParams();
  const [bookmarkedMeals, setBookmarkedMeals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarkedMeals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookmark/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBookmarkedMeals(response.data);
      } catch (error) {
        console.error("Failed to fetch bookmarked meals:", error);
      }
    };

    fetchBookmarkedMeals();
  }, [id]);

  return (
    <div>
      <div className="common-container">
        {modalOpen && <AddMealForm setOpenModal={setModalOpen} />}
      </div>
      <MealList meals={bookmarkedMeals} />
    </div>
  );
};

export default BookmarkedMeals;
