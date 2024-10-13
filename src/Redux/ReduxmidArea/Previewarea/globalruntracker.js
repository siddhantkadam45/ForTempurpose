import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    RunonorOff: 0
};

export const GlobalRunChecker = createSlice({
    name: 'globalRunChecker',
    initialState,
    reducers: {
        updateRunOnOrOff: (state, action) => {
            const { onoroff } = action.payload;
            state.RunonorOff = onoroff;
            console.log('Global run:', state.RunonorOff);
        }
    }
});

export const { updateRunOnOrOff } = GlobalRunChecker.actions;
export default GlobalRunChecker.reducer;
