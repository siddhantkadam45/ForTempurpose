import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    spiritone: {
        move_x: 0,
        move_y: 0,
        rotate_clockwise: 0,
        rotate_anticlockwise: 0
    },
    spirittwo: {
        move_x: 0,
        move_y: 0,
        rotate_clockwise: 0,
        rotate_anticlockwise: 0
    }
};

export const Charateracion = createSlice({
    name: 'charateractions',
    initialState,
    reducers: {
        updatespiritone: (state, action) => {
            const { move_x = state.spiritone.move_x, move_y = state.spiritone.move_y, rotate_anticlockwise, rotate_clockwise } = action.payload;
            state.spiritone.move_x = move_x;
            state.spiritone.move_y = move_y;
            if (rotate_anticlockwise !== undefined) {
                state.spiritone.rotate_anticlockwise = rotate_anticlockwise;
            }
            if (rotate_clockwise !== undefined) {
                state.spiritone.rotate_clockwise = rotate_clockwise;
            }
            console.log(state.spiritone,'spirritone')
        },
        updatespirittwo: (state, action) => {
            const { move_x = state.spirittwo.move_x, move_y = state.spirittwo.move_y, rotate_anticlockwise, rotate_clockwise } = action.payload;
            state.spirittwo.move_x = move_x;
            state.spirittwo.move_y = move_y;
            if (rotate_anticlockwise !== undefined) {
                state.spirittwo.rotate_anticlockwise = rotate_anticlockwise;
            }
            if (rotate_clockwise !== undefined) {
                state.spirittwo.rotate_clockwise = rotate_clockwise;
            }
            console.log(state.spirittwo,'spritwo')
        }
    }
});

export const { updatespiritone, updatespirittwo } = Charateracion.actions;
export default Charateracion.reducer;
