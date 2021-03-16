import { configureStore } from "@reduxjs/toolkit";
import setCurrentUserReducer from "./currentUserSlice";
import displayLoginFormReducer from "./displayLoginFormSlice";
import loginFormStateReducer from "./loginFormStateSlice";
import signupFormStateReducer from "./signupFormStateSlice";
import displaySignupModalReducer from "./displaySignupModalSlice";

const store = configureStore( {
    reducer: {
      currentUser: setCurrentUserReducer,
      displayLoginForm: displayLoginFormReducer,
      loginFormState: loginFormStateReducer,
      signupFormState: signupFormStateReducer,
      displaySignupModal: displaySignupModalReducer
    }
  } );

export default store;