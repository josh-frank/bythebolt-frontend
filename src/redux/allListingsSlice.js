import { createSlice } from "@reduxjs/toolkit";

const allListingsSlice = createSlice( {
    name: "allListings",
    initialState: null,
    reducers: {
      setAllListings( state, action ) {
        return action.payload;
      },
    },
  } );
  
  export const { setAllListings } = allListingsSlice.actions;
  export default allListingsSlice.reducer;