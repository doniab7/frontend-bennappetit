// UserMeal.js
import React, { useEffect, useState } from 'react';
import MealList from './MealList';
import axios from 'axios';
import AddMealForm from './AddMealForm';
import { useMealContext} from '../../context/mealContext';
import { startFetchSingleUserMeals } from '../../actions/mealsActions';
import { useParams } from 'react-router-dom';

const UserMeal = () => {
    const {id} = useParams();
    const { Meals, dispatch } = useMealContext();
    useEffect(() => {
        startFetchSingleUserMeals(dispatch, id);
    }, [id, dispatch]);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    
    <div>
      <div className='sc-title'>Your Recipes</div>
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
      <MealList meals={Meals} />
    </div>
  );
};

export default UserMeal;
