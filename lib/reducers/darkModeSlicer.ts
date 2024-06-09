// store/darkModeSlice.ts
import {createSlice} from '@reduxjs/toolkit';

interface DarkModeState {
    isDarkMode: boolean;
}

const initialState: DarkModeState = {
    isDarkMode: true,
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const {toggleDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer;
