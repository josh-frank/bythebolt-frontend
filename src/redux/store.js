import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import displayLoginFormReducer from "./displayLoginFormSlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      displayLoginForm: displayLoginFormReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;