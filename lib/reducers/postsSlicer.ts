// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PostsState {
    postsList: Array<{}>;
}

const initialState: PostsState = {
    postsList: [],
};

const postsSlice = createSlice({
    name: "PostsMsg",
    initialState,
    reducers: {
        addNewPost: (state, action: PayloadAction<{ data: any }>) => {
            state.postsList.push(action.payload?.data);
        },
        getAllPosts: (state) => state,
        deletePost: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to remove a post from the list
            state.postsList = state.postsList.filter(
                (post) => post !== action.payload?.data
            );
        },
        updatePost: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to update a post in the list
            const index = state.postsList.findIndex(
                (post) => post === action.payload?.data
            );
            if (index !== -1) {
                state.postsList[index] = action.payload?.data;
            }
        },
    },
});

export const {addNewPost, deletePost, updatePost, getAllPosts} =
    postsSlice.actions;

export default postsSlice.reducer;
