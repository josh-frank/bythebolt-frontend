import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import setAllCategoriesReducer from "./allCategoriesSlice";
import setAllListingsReducer from "./allListingsSlice";
import setSearchQueryReducer from "./searchQuerySlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      allCategories: setAllCategoriesReducer,
      allListings: setAllListingsReducer,
      searchQuery: setSearchQueryReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;