import React, { useEffect, useState } from "react";
import MealList from "./MealList";
import AddMealForm from "./AddMealForm";
import { useAuthContext } from "../../context/authenticationContext";

const UserMeal = () => {
  const { authUser } = useAuthContext();
  const [meals, setMeals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/meal/user/${authUser.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [authUser.id]);

  return (
    <div>
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-1 justify-start w-full "style={{ marginTop: "30px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#7b1c27",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add my recipe
          </button>
        </div>
        {modalOpen && <AddMealForm setOpenModal={setModalOpen} />}
      </div>
      
      <MealList meals={meals} />
    </div>
  );
};

export default UserMeal;
