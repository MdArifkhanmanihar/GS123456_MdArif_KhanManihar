import { useState } from "react";
import { useDispatch } from "react-redux";
import { skuitemsActions } from "../store/skuitemsSlice";

function AddNewSku() {
  const [id, setIdName] = useState();
  const [sku, setSkuName] = useState();
  const [price, setPriceName] = useState();
  const [cost, setCostName] = useState();

  const handleIdChange = (event) => {
    setIdName(Number(event.target.value));
  };
  const handleStoreNameChange = (event) => {
    setSkuName(event.target.value);
  };
  const handleCityNameChange = (event) => {
    setPriceName(event.target.value);
  };
  const handleStateNameChange = (event) => {
    setCostName(event.target.value);
  };

  const dispatch = useDispatch();
  const handleAddButtonClicked = () => {
    console.log("idName");
    if (id && sku && price && cost) {
      dispatch(skuitemsActions.addToItems({ id, sku, price, cost }));
    }
    setIdName("");
    setSkuName("");
    setPriceName("");
    setCostName("");
  };
  return (
    <div className="add-container">
      <div className="row kg-row">
        <div className="col-2">
          <input
            type="number"
            placeholder="Enter ID"
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            placeholder="Enter Sku"
            value={sku}
            onChange={handleStoreNameChange}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={handleCityNameChange}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            placeholder="Enter Cost"
            value={cost}
            onChange={handleStateNameChange}
          />
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn  kg-button"
            onClick={handleAddButtonClicked}
            style={{ fontSize: "13px", backgroundColor: "#ffad99" }}
          >
            New Sku
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewSku;
