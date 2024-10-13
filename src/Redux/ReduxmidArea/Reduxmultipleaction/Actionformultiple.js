import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ActionEntrieoffirst: [{ move_x: 0 }],
    ActionEntrieofsecond: [{ move_x: 0 }]
};

export const MulitpleActionorderlist = createSlice({
    name: 'mulitpleorderlist',
    initialState,
    reducers: {
        updatemulipleorderlist: (state, action) => {
            if (action.payload.x) {
                const newActionList = action.payload.ActionEntrieoffirst.map(item => {
                    console.log(item)
                    if (item == 'move_x_y') {
                        const obj = {
                            x: 0,
                            y: 0
                        }
                        const t = { [item]: obj };
                        return t;
                    }
                    else {
                        const t = { [item]: 0 };
                        return t;
                    }
                });
                console.log('update in side mu')
                state.ActionEntrieoffirst = newActionList;
                console.log(state.ActionEntrieoffirst);
            } else {
                const newActionList = action.payload.ActionEntrieofsecond.map(item => {
                    if (item == 'move_x_y') {
                        const obj = {
                            x: 0,
                            y: 0
                        }
                        const t = { [item]: obj };
                        return t;
                    }
                    else {
                        const t = { [item]: 0 };
                        return t;
                    }
                });
                state.ActionEntrieofsecond = newActionList;
                console.log('state of second ')
                console.log(state.ActionEntrieofsecond);
            }
        },
        updateactionlistmulitple : (state,action ) => {
            const { index, actionType, newValue, checkyorx ,firstorsecond} = action.payload;
            if(firstorsecond) {
                if(state.ActionEntrieoffirst[index] && state.ActionEntrieoffirst[index][actionType] !== undefined) {
                    if (actionType === 'move_x_y') {
                        // Check if it's an update for 'x' or 'y' in 'move_x_y'
                        if (checkyorx) {
                            console.log('Updating x:', newValue, 'for action type:', actionType, 'at index:', index);
                            // Update the value of 'x'
                            state.ActionEntrieoffirst[index][actionType].x = newValue;
                        } else {
                            console.log('Updating y:', newValue, 'for action type:', actionType, 'at index:', index);
                            // Update the value of 'y'
                            state.ActionEntrieoffirst[index][actionType].y = newValue;
                        }
                    } else {
                        // Update the value directly for other action types
                        console.log('Updating action type:', actionType, 'with value:', newValue, 'at index:', index);
                        state.ActionEntrieoffirst[index][actionType] = newValue;
                    }
    
                    // Log the updated state for verification
                    console.log('Updated Actionorderlist:', JSON.parse(JSON.stringify(state.ActionEntrieoffirst)));
                }
            } else {
                if(state.ActionEntrieofsecond[index] && state.ActionEntrieofsecond[index][actionType] !== undefined) {
                    if (actionType === 'move_x_y') {
                        // Check if it's an update for 'x' or 'y' in 'move_x_y'
                        if (checkyorx) {
                            console.log('Updating x:', newValue, 'for action type:', actionType, 'at index:', index);
                            // Update the value of 'x'
                            state.ActionEntrieofsecond[index][actionType].x = newValue;
                        } else {
                            console.log('Updating y:', newValue, 'for action type:', actionType, 'at index:', index);
                            // Update the value of 'y'
                            state.ActionEntrieofsecond[index][actionType].y = newValue;
                        }
                    }
                    else {
                        // Update the value directly for other action types
                        console.log('Updating action type:', actionType, 'with value:', newValue, 'at index:', index);
                        state.ActionEntrieofsecond[index][actionType] = newValue;
                    }
    
                    // Log the updated state for verification
                    console.log('Updated Actionorderlist for second:', JSON.parse(JSON.stringify(state.ActionEntrieofsecond))); 
                }
            }
        },
        // setSpiritOneActions : (state,action) => {
        //     // console.log(action.payload)
        //     const {Spirittwoaction} = action.payload;
        //     state.ActionEntrieoffirst = Spirittwoaction;
        //     console.log('setting Actionorderlist:', JSON.parse(JSON.stringify(state.ActionEntrieoffirst)));
        // },
        // setSpiritTwoActions : (state,action) =>{
        //     const {SpiritoneAction} = action.payload;
        //     state.ActionEntrieofsecond = SpiritoneAction;
        //     console.log('setting Actionorderlist for second:', JSON.parse(JSON.stringify(state.ActionEntrieofsecond))); 

        // }
    }
});

export const { updatemulipleorderlist ,updateactionlistmulitple } = MulitpleActionorderlist.actions;
export default MulitpleActionorderlist.reducer;
