import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMultipleEnabled: 0 
};

export const checkMultipleSpirit = createSlice({
    name: 'checkMultipleSpirit',
    initialState,
    reducers: {
        updateCanCreateMultipleSpirit: (state, action) => {
            const { id } = action.payload;
            state.isMultipleEnabled = id; // Update the state with the provided id
            console.log(state.isMultipleEnabled);
        }
    }
});

export const { updateCanCreateMultipleSpirit } = checkMultipleSpirit.actions;
export default checkMultipleSpirit.reducer;
