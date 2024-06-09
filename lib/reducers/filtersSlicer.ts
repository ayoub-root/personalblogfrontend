// store/darkModeSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FiltersState {
    filtersList: Array<{}>;
}

const initialState: FiltersState = {
    filtersList: [],
};

const filtersSlice = createSlice({
    name: "FiltersMsg",
    initialState,
    reducers: {
        addNewFilter: (state, action: PayloadAction<{ data: any }>) => {
            state.filtersList.push(action.payload?.data);
        },
        getAFilters: (state, action: PayloadAction<{ data: any }>) => {
            state.filtersList = action.payload.data;
        },
        deleteFilter: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to remove a filter from the list
            state.filtersList = state.filtersList.filter(
                (filter) => filter !== action.payload?.data
            );
        },
        updateFilter: (state, action: PayloadAction<{ data: any }>) => {
            // Assuming here that you want to update a filter in the list
            const index = state.filtersList.findIndex(
                (filter) => filter === action.payload?.data
            );
            if (index !== -1) {
                state.filtersList[index] = action.payload?.data;
            }
        },
    },
});

export const {addNewFilter, deleteFilter, updateFilter, getAFilters} =
    filtersSlice.actions;

export default filtersSlice.reducer;
