// UserMeal.js
import React, { useEffect, useState } from 'react';
import MealList from './MealList';
import axios from 'axios';
import AddMealForm from './AddMealForm';


const UserMeal = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchUserMeals = async () => {
      try {
        const response = await axios.get('/api/user/meals'); 
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching user meals:', error);
      }
    };
    fetchUserMeals();
  }, []);

  return (
    <div>
      <h1>Your Recipes</h1>
      <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <button 
              type="submit" 
              style={{ backgroundColor: '#7b1c27', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              onClick={() => {
                setModalOpen(true);
              }}
              >Add my recipe
            </button>
          </div>
        {modalOpen && <AddMealForm setOpenModal={setModalOpen} />}
      </div>
      <MealList meals={meals} />
    </div>
  );
};

export default UserMeal;
