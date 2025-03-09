import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for an SKU item
interface SKUItem {
  id: number;
  sku: string;
  price: string;
  cost: string;
}

// Define the initial state type as an array of `SKUItem`
const initialState: SKUItem[] = [
  {
    id: 1,
    sku: "Cotton Polo Shirt",
    price: "$ 139.99",
    cost: "$ 10.78",
  },
  {
    id: 2,
    sku: "Tassel Fringe Handbag",
    price: "$ 134.99",
    cost: "$ 20.79",
  },
  {
    id: 3,
    sku: "Minimalist Leather Watch",
    price: "$ 49.99",
    cost: "$ 49.89",
  },
  {
    id: 4,
    sku: "Foldable Travel Hat",
    price: "$ 194.99",
    cost: "$ 56.16",
  },
  {
    id: 5,
    sku: "Strped Cotton Socks",
    price: "$ 9.99",
    cost: "$ 6.91",
  },
];

const skuitemsSlice = createSlice({
  name: "skuitems",
  initialState,
  reducers: {
    removeFromItems: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    addToItems: (state, action: PayloadAction<SKUItem>) => {
      state.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<SKUItem>) => {
      const { id, sku, price, cost } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.sku = sku;
        existingItem.price = price;
        existingItem.cost = cost;
      }
    },
  },
});

export const skuitemsActions = skuitemsSlice.actions;
export default skuitemsSlice;
