import { createSlice } from "@reduxjs/toolkit";

const signupFormStateSlice = createSlice( {
    name: "signupFormState",
    initialState: { username: "", email: "", password: "", confirmation: "" },
    reducers: {
      setSignupFormState( state, action ) {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.confirmation = action.payload.confirmation;
      },
    },
  } );
  
  export const { setSignupFormState } = signupFormStateSlice.actions;
  export default signupFormStateSlice.reducer;