import { createSlice } from "@reduxjs/toolkit";

const displaySignupModalSlice = createSlice( {
    name: "displaySignupModal",
    initialState: false,
    reducers: {
      setSignupModalDisplay( state, action ) {
        return action.payload;
      },
    },
  } );
  
  export const { setSignupModalDisplay } = displaySignupModalSlice.actions;
  export default displaySignupModalSlice.reducer;