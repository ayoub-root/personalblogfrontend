// store/darkModeSlice.ts
import {createSlice} from '@reduxjs/toolkit';

interface AppState {
    openLogin: boolean;
    openRegister: boolean;
    openForgotPassword: boolean;
    openResetPassword: boolean;
}

const initialState: AppState = {
    openLogin: false,
    openRegister: false,
    openForgotPassword: false,
    openResetPassword: false,
};

const appSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        toggleOpenLogin: (state) => {
            state.openLogin = !state.openLogin;
        },
        toggleOpenRegister: (state) => {
            state.openRegister = !state.openRegister;
        },
        toggleOpenForgotPassword: (state) => {
            state.openForgotPassword = !state.openForgotPassword;
        },
        toggleOpenResetPassword: (state) => {
            state.openResetPassword = !state.openResetPassword;
        }
    },
});

export const {
    toggleOpenLogin,
    toggleOpenForgotPassword,
    toggleOpenResetPassword,
    toggleOpenRegister
} = appSlice.actions;

export default appSlice.reducer;
