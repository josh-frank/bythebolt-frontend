import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import setAllCategoriesReducer from "./allCategoriesSlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      allCategories: setAllCategoriesReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;