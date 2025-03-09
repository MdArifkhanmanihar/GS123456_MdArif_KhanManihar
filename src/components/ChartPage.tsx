import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ChartPage = () => {
  const stores = useSelector((state) => [
    ...new Set(state.planningitems.map((item) => item.store)),
  ]); // Get unique stores

  const [selectedStore, setSelectedStore] = useState(stores[0]); // Default selection

  const items = useSelector((state) =>
    state.planningitems.filter((item) => item.store === selectedStore)
  );

  // Aggregate GM Dollars and Sales Dollars per week
  const aggregatedData = items.reduce((acc, item) => {
    item.weeklyData.forEach((weekData, index) => {
      if (!acc[index]) {
        acc[index] = {
          week: `Week ${index + 1}`,
          gmDollar: 0,
          salesDollar: 0,
          gmPercentage: 0,
        };
      }
      acc[index].gmDollar += weekData.gmDollar;
      acc[index].salesDollar += weekData.salesDollar;
      acc[index].gmPercentage =
        acc[index].salesDollar > 0
          ? (acc[index].gmDollar / acc[index].salesDollar) * 100
          : 0;
    });
    return acc;
  }, []);

  return (
    <div style={{ width: "100%", margin: "1% auto" }}>
      <select
        style={{ marginLeft: "1%" }}
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        {stores.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>

      {/* Dual-Axis Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={aggregatedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis
            yAxisId="left"
            label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "GM %", angle: -90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollar" fill="#8884d8" name="GM $" />
          <Bar
            yAxisId="right"
            dataKey="gmPercentage"
            fill="#82ca9d"
            name="GM %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPage;
