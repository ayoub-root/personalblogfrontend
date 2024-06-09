// store/darkModeSlice.ts
import {createSlice} from "@reduxjs/toolkit";

interface WarningState {
    isWarningOpen: boolean;
    message: string;
    type: string;
}

const initialState: WarningState = {
    isWarningOpen: false,
    message: "",
    type: "success",
};

const warningSlice = createSlice({
    name: "warningMsg",
    initialState,
    reducers: {
        showWarning: (state, action) => {
            state.message = action.payload?.message;
            state.isWarningOpen = true;
            state.type = action.payload?.type || "waring";
        },
        hideWarning: (state) => {
            state.isWarningOpen = false;
            state.message = "";
        },
    },
});

export const {showWarning, hideWarning} = warningSlice.actions;

export default warningSlice.reducer;
