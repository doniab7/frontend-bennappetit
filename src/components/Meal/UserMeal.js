// UserMeal.js
import React, { useEffect, useState } from 'react';
import MealList from './MealList';
import axios from 'axios';

const UserMeal = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchUserMeals = async () => {
      try {
        const response = await axios.get('/api/user/meals'); // Modifier l'URL pour correspondre à votre API
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
      
      <MealList meals={meals} />
    </div>
  );
};

export default UserMeal;
