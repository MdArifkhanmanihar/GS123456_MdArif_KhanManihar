import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { planningitemsActions } from "../store/planningitemsSlice";
import { themeBalham } from "ag-grid-community";
const myTheme = themeBalham.withParams({
  accentColor: "gray",
});
const PlanningTable = () => {
  const items = useSelector((store) => store.planningitems);
  const dispatch = useDispatch();
  const salesUnitRefs = useRef({}); // Store refs for each editable field

  const handleSalesUnitChange = (id, weekIndex, value) => {
    const salesUnit = Number(value) || 0;
    dispatch(
      planningitemsActions.updateSalesUnit({ id, weekIndex, salesUnit })
    );
  };

  const colDefs = [
    { field: "store", headerName: "Store" },
    { field: "sku", headerName: "SKU" },
    ...Array.from({ length: 2 }, (_, weekIndex) => ({
      headerName: `Week 0${weekIndex + 1}`,
      children: [
        {
          headerName: "Sales Unit",
          field: `salesUnit_${weekIndex}`,
          editable: true,
          cellRenderer: (params) => {
            const { id } = params.data;
            return (
              <input
                ref={(el) => (salesUnitRefs.current[`${id}_${weekIndex}`] = el)}
                type="number"
                defaultValue={params.value}
                onBlur={(e) =>
                  handleSalesUnitChange(id, weekIndex, e.target.value)
                }
                style={{ width: "80px" }}
              />
            );
          },
        },
        { headerName: "Sales Dollars", field: `salesDollar_${weekIndex}` },
        { headerName: "GM Dollars", field: `gmDollar_${weekIndex}` },
        {
          headerName: "GM Percent",
          field: `gmPercentage_${weekIndex}`,
          cellStyle: (params) => {
            const value = parseFloat(params.value); // Convert to number
            if (value >= 40)
              return { backgroundColor: "green", color: "white" };
            if (value >= 10 && value < 40)
              return { backgroundColor: "yellow", color: "black" };
            if (value > 5 && value < 10)
              return { backgroundColor: "orange", color: "black" };
            if (value <= 5) return { backgroundColor: "red", color: "white" };
            return null; // Default
          },
        },
      ],
    })).flat(),
  ];

  const rowData = items.map((item) => {
    const weeklyDataFlattened = item.weeklyData.reduce(
      (acc, weekData, index) => {
        acc[`salesUnit_${index}`] = weekData.salesUnit;
        acc[`salesDollar_${index}`] = weekData.salesDollar;
        acc[`gmDollar_${index}`] = weekData.gmDollar;
        acc[`gmPercentage_${index}`] = weekData.gmPercentage.toFixed(2) + "%";
        return acc;
      },
      {}
    );
    return {
      id: item.id,
      store: item.store,
      sku: item.sku,
      ...weeklyDataFlattened,
    };
  });

  return (
    <div className="store-page">
      <div className="ag-theme-balham ag-grid-table">
        <AgGridReact
          theme={myTheme}
          rowData={rowData}
          columnDefs={colDefs}
          rowHeight={50}
        />
      </div>
    </div>
  );
};

export default PlanningTable;
