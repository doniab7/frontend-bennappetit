import React, {useEffect} from 'react';
import "./CategoryPage.scss";
import { useMealContext } from '../../context/mealContext';
import MealList from '../../components/Meal/MealList';
import { useParams } from 'react-router-dom';
import { startFetchMealByCategory } from '../../actions/mealsActions';

const CategoryPage = () => {
  const {name} = useParams();
  const { categoryMeals, dispatch } = useMealContext();


  useEffect(() => {
    startFetchMealByCategory(dispatch, name);
  }, [name, dispatch]);

  console.log(categoryMeals);

  return (
    <main className='main-content py-5'>
      <div className='container'>
        <div className='cat-description px-4 py-4'>
          <h2 className='text-orange fw-8'>{name}</h2>
        </div>
      </div>
      {
        (categoryMeals?.length) ? <MealList meals = { categoryMeals } /> : null
      }
    </main>
  )
}

export default CategoryPage
