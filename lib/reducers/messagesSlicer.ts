// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MessagesState {
    messagesList: Array<{}>;
}

const initialState: MessagesState = {
    messagesList: [],
};

const messagesSlice = createSlice({
    name: "MessagesMsg",
    initialState,
    reducers: {
        addNewMessage: (state, action: PayloadAction<{ data: any }>) => {
            state.messagesList.push(action.payload?.data);
        },
        getAllMessages: (state) => state,
        deleteMessage: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to remove a message from the list
            state.messagesList = state.messagesList.filter(
                (message) => message !== action.payload?.data
            );
        },
        updateMessage: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to update a message in the list
            const index = state.messagesList.findIndex(
                (message) => message === action.payload?.data
            );
            if (index !== -1) {
                state.messagesList[index] = action.payload?.data;
            }
        },
    },
});

export const {addNewMessage, deleteMessage, updateMessage, getAllMessages} =
    messagesSlice.actions;

export default messagesSlice.reducer;
