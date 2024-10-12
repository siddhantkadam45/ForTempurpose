import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Actionorderlist: [{ move_x: 0 }]
};


export const actionorderslice = createSlice({
    name: 'actionsorderlist',
    initialState,
    reducers: {
        UpdateActionsfordrag: (state, action) => {
            const { actiontype } = action.payload;
            state.Actionorderlist = [];
            // console.log('acfor be ',state.Actionorderlist)
            actiontype.forEach((item, index) => {
                if (item == 'move_x_y') {
                    const obj = {
                        x: 0,
                        y: 0
                    }
                    const t = { [item]: obj };
                    state.Actionorderlist.push(t);
                }
                else {
                    const t = { [item]: 0 };
                    state.Actionorderlist.push(t);
                }
            });
            console.log('final ', state.Actionorderlist)
        },

        updateAction: (state, action) => {
            const { index, actionType, newValue, checkyorx } = action.payload;
            // Dynamically updating the specific action type (move_x, move_y, etc.)
            if (state.Actionorderlist[index] && state.Actionorderlist[index][actionType] !== undefined) {
                if (actionType === 'move_x_y') {
                    // Check if it's an update for 'x' or 'y' in 'move_x_y'
                    if (checkyorx) {
                        console.log('Updating x:', newValue, 'for action type:', actionType, 'at index:', index);
                        // Update the value of 'x'
                        state.Actionorderlist[index][actionType].x = newValue;
                    } else {
                        console.log('Updating y:', newValue, 'for action type:', actionType, 'at index:', index);
                        // Update the value of 'y'
                        state.Actionorderlist[index][actionType].y = newValue;
                    }
                } else {
                    // Update the value directly for other action types
                    console.log('Updating action type:', actionType, 'with value:', newValue, 'at index:', index);
                    state.Actionorderlist[index][actionType] = newValue;
                }

                // Log the updated state for verification
                console.log('Updated Actionorderlist:', JSON.parse(JSON.stringify(state.Actionorderlist)));
            }
        }
    }
});

export const { updateAction, UpdateActionsfordrag } = actionorderslice.actions;
export default actionorderslice.reducer;
