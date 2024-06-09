// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface selectedStoryState {
    selectedStory: any;
}

const initialState: selectedStoryState = {
    selectedStory: null,
};

const selectedStorySlice = createSlice({
    name: "selectedStoryMsg",
    initialState,
    reducers: {

        getselectedStory: (state) => state.selectedStory,

        updateselectedStory: (state, action: PayloadAction<any>) => {
            // Assuming here that you want to update a account in the list

            state.selectedStory = {...state.selectedStory, ...action.payload};
        },
    },
});

export const { updateselectedStory, getselectedStory} =
    selectedStorySlice.actions;

export default selectedStorySlice.reducer;
