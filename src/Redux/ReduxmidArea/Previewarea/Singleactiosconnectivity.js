import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    x: 0,
    y: 0,
    rotation: 0
};

export const singleConnectivity = createSlice({
    name: 'singleConnectivity',
    initialState,
    reducers: {
        updateConnectivity: (state, action) => {
            const { x, y, rotation } = action.payload;
            state.x = x;
            state.y = y;
            state.rotation = rotation;
            console.log(state.x, state.y, state.rotation);
        }
    }
});

// Correcting the export syntax here
export const { updateConnectivity } = singleConnectivity.actions;
export default singleConnectivity.reducer;
