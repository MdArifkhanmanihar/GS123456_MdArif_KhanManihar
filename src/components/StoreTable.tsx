import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeBalham,
} from "ag-grid-community";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import AddNewStore from "./AddNewStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";

const myTheme = themeBalham.withParams({
  accentColor: "gray",
});
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
interface UserInterface {
  id: number;
  store: string;
  city: string;
  state: string;
}

const StoreTable = () => {
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // Refs to store input values
  const storeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const handleRemoveItem = (id: number) => {
    console.log("itemid:" + id);

    dispatch(itemsActions.removeFromItems(id));
  };
  const handleEdit = (id: number, rowData: UserInterface) => {
    console.log("handle edit id" + id);
    setEditingRowId(id);
    // Set initial values in refs
    if (storeRef.current) storeRef.current.value = rowData.store;
    if (cityRef.current) cityRef.current.value = rowData.city;
    if (stateRef.current) stateRef.current.value = rowData.state;
  };

  const handleSave = (id: number) => {
    dispatch(
      itemsActions.updateItem({
        id,
        store: storeRef.current?.value || "",
        city: cityRef.current?.value || "",
        state: stateRef.current?.value || "",
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
          <FiUploadCloud
            onClick={() => handleSave(id)}
            style={{ fontSize: "20px" }}
          />
        ) : (
          <>
            <RiDeleteBin6Line
              onClick={() => handleRemoveItem(id)}
              style={{ fontSize: "20px" }}
            />
            <CiEdit
              onClick={() => handleEdit(id, params.data)}
              style={{ fontSize: "20px", marginLeft: "20px" }}
            />
          </>
        );
      },
    },
    { field: "id" },
    {
      field: "store",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={storeRef} defaultValue={params.value} />
        ) : (
          params.value
        ),
    },
    {
      field: "city",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={cityRef} defaultValue={params.value} />
        ) : (
          params.value
        ),
    },
    {
      field: "state",
      cellRenderer: (params: any) =>
        editingRowId === params.data.id ? (
          <input ref={stateRef} defaultValue={params.value} />
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
          rowData={items}
          columnDefs={colDefs}
          rowHeight={50}
        />
      </div>
      <AddNewStore />
    </div>
  );
};

export default StoreTable;
