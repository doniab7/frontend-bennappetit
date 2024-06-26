import axios from "../api/axios";
import {
  FETCH_CATEGORY_BEGIN,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_MEALS_BEGIN,
  FETCH_CATEGORY_MEALS_ERROR,
  FETCH_CATEGORY_MEALS_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  FETCH_MEALS_BEGIN,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_SUCCESS,
  FETCH_SINGLE_MEAL_BEGIN,
  FETCH_SINGLE_MEAL_ERROR,
  FETCH_SINGLE_MEAL_SUCCESS,
  FETCH_SINGLE_USER_MEALS_BEGIN,
  FETCH_SINGLE_USER_MEALS_ERROR,
  FETCH_SINGLE_USER_MEALS_SUCCESS
} from "./actions";

import {
  CATEGORIES_URL,
  MEAL_CATEGORIES_URL,
  MEAL_SINGLE_URL,
  SEARCH_URL,
  MEALS_URL,
  MEALS_USER_URL,
} from "../utils/constants";

// Fetch all categories
export const startFetchCategories = async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORY_BEGIN });
    const response = await axios.get(`${CATEGORIES_URL}`);
    dispatch({
      type: FETCH_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_ERROR, payload: error.message });
  }
};

// Fetch a single meal by its ID
export const startFetchSingleMeal = async (dispatch, id) => {
  try {
    dispatch({ type: FETCH_SINGLE_MEAL_BEGIN });
    const response = await axios.get(`${MEAL_SINGLE_URL}/${id}`);
    dispatch({ type: FETCH_SINGLE_MEAL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_MEAL_ERROR, payload: error.message });
  }
};

// Fetch meals for a specific category
export const startFetchMealByCategory = async (dispatch, category) => {
  try {
    dispatch({ type: FETCH_CATEGORY_MEALS_BEGIN });
    const response = await axios.get(`${MEAL_CATEGORIES_URL}/${category}`);
    dispatch({
      type: FETCH_CATEGORY_MEALS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_MEALS_ERROR, payload: error.message });
  }
};

// Fetch meals by a search term
export const startFetchMealsBySearch = async (dispatch, searchTerm) => {
  try {
    dispatch({ type: FETCH_MEALS_BEGIN });
    const response = await axios.get(`${SEARCH_URL}?term=${encodeURIComponent(searchTerm)}`);
    console.log(`${SEARCH_URL}?term=${encodeURIComponent(searchTerm)}`);
    dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MEALS_ERROR, payload: error.message });
  }
};

// Fetch all meals
export const startFetchMeals = async (dispatch) => {
  try {
    dispatch({ type: FETCH_MEALS_BEGIN });
    const response = await axios.get(`${MEALS_URL}`);
    dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MEALS_ERROR, payload: error.message });
  }
};

// Fetch meals for a specific user
export const startFetchSingleUserMeals = async (dispatch,id) => {
  try {
    dispatch({ type: FETCH_SINGLE_USER_MEALS_BEGIN });
    const response = await axios.get(`${MEALS_USER_URL}/${id}`);
    dispatch({ type: FETCH_SINGLE_USER_MEALS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_USER_MEALS_ERROR, payload: error.message });
  }
};
