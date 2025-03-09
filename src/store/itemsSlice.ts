import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for an Item
interface Item {
    id: number;
    store: string;
    city: string;
    state: string;
}

// Define the initial state type as an array of `Item`
const initialState: Item[] = [
    {
        id: 1,
        store: "San Francisco Bay Trends",
        city: "San Francisco",
        state: "CA",
    },
    {
        id: 2,
        store: "Phoenix Sunwear",
        city: "Phoenix",
        state: "AZ",
    },
    {
        id: 3,
        store: "Dallas Ranch Supply",
        city: "Dallas",
        state: "TX",
    },
    {
        id: 4,
        store: "Atlanta Outfitters",
        city: "Atlanta",
        state: "GA",
    },
    {
        id: 5,
        store: "Nashville Melody Music Store",
        city: "Nashville",
        state: "TN",
    },
];

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        removeFromItems: (state, action: PayloadAction<number>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        addToItems: (state, action: PayloadAction<Item>) => {
            state.push(action.payload);
        },
        updateItem: (state, action: PayloadAction<Item>) => {
            const { id, store, city, state: newState } = action.payload;
            const existingItem = state.find((item) => item.id === id);
            if (existingItem) {
                existingItem.store = store;
                existingItem.city = city;
                existingItem.state = newState;
            }
        },
    },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
