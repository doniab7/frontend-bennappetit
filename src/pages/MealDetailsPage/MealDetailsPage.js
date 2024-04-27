import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./MealDetailsPage.scss";
import CategoryList from '../../components/Category/CategoryList';
import MealSingle from "../../components/Meal/MealSingle";
import { useMealContext } from '../../context/mealContext';
import { startFetchSingleMeal } from '../../actions/mealsActions';
import Loader from '../../components/Loader/Loader';

const MealDetailsPage = () => {
  const { id } = useParams();
  const { categories, dispatch, meal, categoryLoading, mealLoading } = useMealContext();
  const [singleMeal, setSingleMeal] = useState(null);

  useEffect(() => {
    startFetchSingleMeal(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    if (!mealLoading && meal) {
      setSingleMeal(meal); // Assign the meal object to singleMeal
    }
  }, [meal, mealLoading]);

  console.log("singleMeal: ", singleMeal);
  console.log("meal: ", meal);

  return (
    <main className='main-content bg-whitesmoke'>
      { mealLoading ? <Loader /> : singleMeal ? <MealSingle meal={singleMeal} /> : <p>No meal found</p> }
      { categoryLoading ? <Loader /> : <CategoryList categories={categories} /> }
    </main>
  );
};

export default MealDetailsPage;
