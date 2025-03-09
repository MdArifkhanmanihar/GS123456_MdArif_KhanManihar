import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for weekly sales data
interface WeeklyData {
    week: string;
    salesUnit: number;
    salesDollar: number;
    gmDollar: number;
    gmPercentage: number;
}

// Define the type for a planning item
interface PlanningItem {
    id: number;
    store: string;
    sku: string;
    price: number;
    cost: number;
    weeklyData: WeeklyData[];
}

// Define the initial state type as an array of `PlanningItem`
const initialState: PlanningItem[] = [
    {
        id: 1,
        store: "San Francisco Bay Trends",
        sku: "Cotton Polo Shirt",
        price: 139.99,
        cost: 10.78,
        weeklyData: [
            { week: "Week 1", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
            { week: "Week 2", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
        ],
    },
    {
        id: 2,
        store: "Phoenix Sunwear",
        sku: "Tassel Fringe Handbag",
        price: 134.99,
        cost: 20.79,
        weeklyData: [
            { week: "Week 1", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
            { week: "Week 2", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
        ],
    },
    {
        id: 3,
        store: "Dallas Ranch Supply",
        sku: "Minimalist Leather Watch",
        price: 49.99,
        cost: 49.89,
        weeklyData: [
            { week: "Week 1", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
            { week: "Week 2", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
        ],
    },
    {
        id: 4,
        store: "Atlanta Outfitters",
        sku: "Foldable Travel Hat",
        price: 194.99,
        cost: 56.16,
        weeklyData: [
            { week: "Week 1", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
            { week: "Week 2", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
        ],
    },
    {
        id: 5,
        store: "Nashville Melody Music Store",
        sku: "Strped Cotton Socks",
        price: 9.99,
        cost: 6.91,
        weeklyData: [
            { week: "Week 1", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
            { week: "Week 2", salesUnit: 0, salesDollar: 0, gmDollar: 0, gmPercentage: 0 },
        ],
    },
];

// Define the payload structure for updating sales units
interface UpdateSalesUnitPayload {
    id: number;
    weekIndex: number;
    salesUnit: number;
}

const planningitemsSlice = createSlice({
    name: "planningitems",
    initialState,
    reducers: {
        updateSalesUnit: (state, action: PayloadAction<UpdateSalesUnitPayload>) => {
            const { id, weekIndex, salesUnit } = action.payload;
            const item = state.find((store) => store.id === id);
            if (item && weekIndex >= 0 && weekIndex < item.weeklyData.length) {
                const weekData = item.weeklyData[weekIndex];
                weekData.salesUnit = salesUnit;
                weekData.salesDollar = salesUnit * item.price;
                weekData.gmDollar = weekData.salesDollar - salesUnit * item.cost;
                weekData.gmPercentage =
                    weekData.salesDollar > 0 ? (weekData.gmDollar / weekData.salesDollar) * 100 : 0;
            }
        },
    },
});

export const planningitemsActions = planningitemsSlice.actions;
export default planningitemsSlice;
