import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import setAllCategoriesReducer from "./allCategoriesSlice";
import setAllListingsReducer from "./allListingsSlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      allCategories: setAllCategoriesReducer,
      allListings: setAllListingsReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;