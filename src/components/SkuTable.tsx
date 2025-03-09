import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeBalham,
} from "ag-grid-community";
import { useSelector, useDispatch } from "react-redux";
import { skuitemsActions } from "../store/skuitemsSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";
import AddNewSku from "./AddNewSku";

const myTheme = themeBalham.withParams({
  accentColor: "gray",
});
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
interface UserInterface {
  id: number;
  sku: string;
  price: string;
  cost: string;
}

const SkuTable = () => {
  const skuitems = useSelector((store) => store.skuitems);
  const dispatch = useDispatch();
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // Refs to store input values
  const skuRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const handleRemoveItem = (id: number) => {
    console.log("itemid:" + id);

    dispatch(skuitemsActions.removeFromItems(id));
  };
  const handleEdit = (id: number, rowData: UserInterface) => {
    console.log("handle edit id" + id);
    setEditingRowId(id);
    // Set initial values in refs
    if (skuRef.current) skuRef.current.value = rowData.sku;
    if (priceRef.current) priceRef.current.value = rowData.price;
    if (costRef.current) costRef.current.value = rowData.cost;
  };

  const handleSave = (id: number) => {
    dispatch(
      skuitemsActions.updateItem({
        id,
        sku: skuRef.current?.value || "",
        price: priceRef.current?.value || "",
        cost: costRef.current?.value || "",
      })
    );

    setEditingRowId(null);
  };
  const colDefs: ColDef<UserInterface>[] = [
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        const { id } = params.data;
        return editingRowId === id ? (
          // <button onClick={() => handleSave(id)}>Save</button>
          <FiUploadCloud
            onClick={() => handleSave(id)}
            style={{ fontSize: "20px" }}
          />
        ) : (
          <>
            {/* <button onClick={() => handleRemoveItem(id)}>Delete</button> */}
            <RiDeleteBin6Line
              onClick={() => handleRemoveItem(id)}
              style={{ fontSize: "20px" }}
            />
            {/* <button onClick={() => handleEdit(id, params.data)}>Edit</button> */}
            <CiEdit
              onClick={() => handleEdit(id, params.data)}
              style={{ fontSize: "20px", marginLeft: "20px" }}
            />
          </>
        );
      },
    },
    // { field: "id" },
    {
      field: "sku",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={skuRef} defaultValue={params.value} />
        ) : (
          params.value
        ),
    },
    {
      field: "price",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={priceRef} defaultValue={params.value} />
        ) : (
          params.value
        ),
    },
    {
      field: "cost",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={costRef} defaultValue={params.value} />
        ) : (
          params.value
        ),
    },
  ];

  return (
    <div className="store-page">
      <div className="ag-theme-balham ag-grid-table">
        <AgGridReact
          theme={myTheme}
          rowData={skuitems}
          columnDefs={colDefs}
          rowHeight={50}
        />
      </div>
      <AddNewSku />
    </div>
  );
};

export default SkuTable;
