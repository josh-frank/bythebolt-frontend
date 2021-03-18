import { createSlice } from "@reduxjs/toolkit";

const allCategoriesSlice = createSlice( {
    name: "allCategories",
    initialState: null,
    reducers: {
      setAllCategories( state, action ) {
        return action.payload;
      },
    },
  } );
  
  export const { setAllCategories } = allCategoriesSlice.actions;
  export default allCategoriesSlice.reducer;