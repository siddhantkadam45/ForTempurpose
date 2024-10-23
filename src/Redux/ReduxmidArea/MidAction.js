import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Singleactionlist: ['move_x']
};


export const actionSlice = createSlice({
    name: 'actions',
    initialState,
    reducers: {
        updatesinglelist: (state, action) => {

            state.Singleactionlist = []
            state.Singleactionlist = [...action.payload.updatedActions];

            console.log(state.Singleactionlist ,' single actoa back')
        }
    }
});

export const { updatesinglelist } = actionSlice.actions;
export default actionSlice.reducer;
    