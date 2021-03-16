import { createSlice } from "@reduxjs/toolkit";

const displayLoginFormSlice = createSlice( {
    name: "displayLoginForm",
    initialState: false,
    reducers: {
      setLoginFormDisplay( state, action ) {
        return action.payload;
      },
    },
  } );
  
  export const { setLoginFormDisplay } = displayLoginFormSlice.actions;
  export default displayLoginFormSlice.reducer;