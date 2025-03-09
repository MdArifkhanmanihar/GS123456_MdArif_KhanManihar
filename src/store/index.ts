import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import skuitemsSlice from "./skuitemsSlice";
import planningitemsSlice from "./planningitemsSlice";

const dataStore = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        skuitems: skuitemsSlice.reducer,
        planningitems: planningitemsSlice.reducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof dataStore.getState>;
export type AppDispatch = typeof dataStore.dispatch;

export default dataStore;
