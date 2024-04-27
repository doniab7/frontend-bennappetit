import React, {createContext, useContext, useEffect, useReducer} from "react";
import { mealReducer } from "../reducers/mealReducer";
import { startFetchCategories, startFetchMeals } from "../actions/mealsActions";

const initialState = {
    categories: [],
    categoryLoading: false,
    categoryError: false,
    categoryMeals: [],
    categoryMealsLoading: false,
    categoryMealsError: false,
    meals: [],
    mealsLoading: false,
    mealsError: false,
    meal: [],
    mealLoading: false,
    mealError: false
}

const MealContext = createContext({});
export const MealProvider = ({children}) => {
    const [state, dispatch] = useReducer(mealReducer, initialState);

    useEffect(() => {
        startFetchCategories(dispatch);
        startFetchMeals(dispatch);
    }, []);

    return (
        <MealContext.Provider value = {{
            ...state,
            dispatch,
            startFetchCategories,
            startFetchMeals
        }}>
            {children}
        </MealContext.Provider>
    )
}

export const useMealContext = () => {
    return useContext(MealContext);
}