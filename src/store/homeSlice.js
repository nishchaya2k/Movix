import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},            //Paths of movies posters, and  profile images etc
        genres: {},         //like comedy,action, etc 
    },
    reducers: {
        getApiConfiguration: (state, action) => {  //action that we will pass, and state is the initial state
            state.url = action.payload;             //new value which we will send in action.payload
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;