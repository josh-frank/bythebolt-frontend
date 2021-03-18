import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;