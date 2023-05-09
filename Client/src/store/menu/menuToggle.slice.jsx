import { createSlice } from '@reduxjs/toolkit';

const initialState = { opened: false };

export const menuSlice = createSlice({
    name: 'menuToggle',
    initialState: initialState,
    reducers: {
        toggleMenu(state) {
            state.opened = !state.opened;
        }
    }
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;




