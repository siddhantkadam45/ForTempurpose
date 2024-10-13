import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkxory: 0  // Use colon instead of equal sign
};

export const checkxorytoshow = createSlice({
    name: 'showxory',
    initialState,
    reducers: {
        updatexory: (state, action) => {
            const { xory } = action.payload;
            state.checkxory = xory;
        }
    }
});

export const { updatexory } = checkxorytoshow.actions;
export default checkxorytoshow.reducer;
