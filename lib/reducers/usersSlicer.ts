// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UsersState {
    usersList: Array<{}>;
}

const initialState: UsersState = {
    usersList: [],
};

const usersSlice = createSlice({
    name: "UsersMsg",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<{ data: any }>) => {
            state.usersList.push(action.payload?.data);
        },
        getAllUsers: (state) => state,

        deleteUser: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to remove a user from the list
            state.usersList = state.usersList.filter(
                (user) => user !== action.payload?.data
            );
        },
        updateUser: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to update a user in the list
            const index = state.usersList.findIndex(
                (user) => user === action.payload?.data
            );
            if (index !== -1) {
                state.usersList[index] = action.payload?.data;
            }
        },
    },
});

export const {addNewUser, deleteUser, updateUser, getAllUsers} =
    usersSlice.actions;

export default usersSlice.reducer;
