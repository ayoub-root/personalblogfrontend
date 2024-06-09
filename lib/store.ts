// store/index.ts
import {configureStore} from "@reduxjs/toolkit";
import darkModeReducer from "./reducers/darkModeSlicer";
import warningSlicer from "./reducers/warningSlicer";
import filtersSlicer from "./reducers/filtersSlicer";

import postsSlicer from "./reducers/postsSlicer";
import accountSlicer from "./reducers/accountSlicer";
import messagesSlicer from "./reducers/messagesSlicer";
import usersSlicer from "./reducers/usersSlicer";
import appSlicer from "./reducers/appSlicer";
import storySlicer from "./reducers/storySlicer";

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        warningMsg: warningSlicer,
        filtersList: filtersSlicer,
        postsList: postsSlicer,
        loggedAccount: accountSlicer,
        messagesList: messagesSlicer,
        usersList: usersSlicer,
        appSettings: appSlicer,
        selectedStory:storySlicer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
