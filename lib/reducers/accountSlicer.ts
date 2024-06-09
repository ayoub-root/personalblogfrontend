// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AccountsState {
    loggedAccount: any;
}

const initialState: AccountsState = {
    loggedAccount: null,
};

const accountsSlice = createSlice({
    name: "AccountsMsg",
    initialState,
    reducers: {
        login: (state, action: PayloadAction) => {
            state.loggedAccount = action.payload;
        },
        getLoggedAccount: (state) => state,
        logout: (state) => {
            // Assuming here that you want to remove a account from the list
            state.loggedAccount = null;
        },
        updateLoggedAccount: (state, action: PayloadAction<any>) => {
            // Assuming here that you want to update a account in the list

            state.loggedAccount = {...state.loggedAccount, ...action.payload};
        },
    },
});

export const {login, logout, updateLoggedAccount, getLoggedAccount} =
    accountsSlice.actions;

export default accountsSlice.reducer;
