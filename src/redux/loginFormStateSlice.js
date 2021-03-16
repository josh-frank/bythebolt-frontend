import { createSlice } from "@reduxjs/toolkit";

const loginFormStateSlice = createSlice( {
    name: "loginFormState",
    initialState: { username: "", password: "", confirmation: "" },
    reducers: {
      setLoginFormState( state, action ) {
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.confirmation = action.payload.confirmation;
      },
    },
  } );
  
  export const { setLoginFormState } = loginFormStateSlice.actions;
  export default loginFormStateSlice.reducer;