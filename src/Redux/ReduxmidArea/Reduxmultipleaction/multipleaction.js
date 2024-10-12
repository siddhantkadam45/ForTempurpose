import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Entriesoffirst: ['move_x'],
    Entriesofsecond: ['move_x']
}

export const Mulitpleactions = createSlice({
    name: 'mulitpleactionlist',
    initialState,
    reducers: {
        updatemultipleaction: (state, action) => {
            if (action.payload.x) {
                const listToUpdate = action.payload.Entriesoffirst;
                state.Entriesoffirst = listToUpdate;
                console.log(state.Entriesoffirst, 'Entriesoffirst');
            } else {
                
                const listToUpdate = action.payload.Entriesofsecond;
                state.Entriesofsecond = listToUpdate;
                console.log(state.Entriesofsecond, 'Entriesofsecond');
            }
        }
    }
})

export const { updatemultipleaction } = Mulitpleactions.actions;
export default Mulitpleactions.reducer;
