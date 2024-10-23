import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Actionorderlist: [{ move_x: 0 }]
};


export const actionorderslice = createSlice({
    name: 'actionsorderlist',
    initialState,
    reducers: {
        UpdateActionsfordrag: (state, action) => {
            const { actiontype ,givenindex} = action.payload;
           console.log('arry in backend ', actiontype)
            const temp = []
            state.Actionorderlist.forEach((element,index) => {
                if(index<givenindex) {
                    temp.push(element);
                }
            });
            console.log(temp,'temp form back before ');
            
            actiontype.forEach((item, index) => {
                if(index>=givenindex) {
                    if (item == 'move_x_y') {
                        const obj = {
                            x: 0,
                            y: 0
                        }
                        const t = { [item]: obj };
                        temp.push(t);
                    }
                    else {
                        const t = { [item]: 0 };
                        temp.push(t);
                    }
                }
            });
            console.log('temp after e', temp);
            state.Actionorderlist = temp;
            console.log('final ', state.Actionorderlist)
        },

        updateAction: (state, action) => {
            const { index, actionType, newValue, checkyorx } = action.payload;
            // Dynamically updating the specific action type (move_x, move_y, etc.)
            const updatedActionList = [...state.Actionorderlist];

            if (updatedActionList[index] && updatedActionList[index][actionType] !== undefined) {
                if (actionType === 'move_x_y') {
                  // Update the specific field
                  if (checkyorx) {
                    updatedActionList[index][actionType].x = Number(newValue);
                  } else {
                    updatedActionList[index][actionType].y = Number(newValue);
                  }
                } else {
                  updatedActionList[index][actionType] = Number(newValue);
                }
                // Set the updated list back to state
                state.Actionorderlist = updatedActionList;
        
                // Log for verification
                console.log('Updated Actionorderlist:', JSON.parse(JSON.stringify(state.Actionorderlist)));
              }
        }
    }
});

export const { updateAction, UpdateActionsfordrag } = actionorderslice.actions;
export default actionorderslice.reducer;
