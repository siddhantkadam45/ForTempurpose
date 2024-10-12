import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Singleactionlist: ['move_x']
};


export const actionSlice = createSlice({
    name: 'actions',
    initialState,
    reducers: {
        updatesinglelist: (state, action) => {
            state.Singleactionlist = action.payload.updatedActions;
        }
    }
});

export const { updatesinglelist } = actionSlice.actions;
export default actionSlice.reducer;
    