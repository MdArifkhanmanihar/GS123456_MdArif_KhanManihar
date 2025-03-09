import { useState } from "react";
import { useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";

function AddNewStore() {
  const [id, setIdName] = useState();
  const [store, setStoreName] = useState();
  const [city, setCityName] = useState();
  const [state, setStateName] = useState();

  const handleIdChange = (event) => {
    setIdName(Number(event.target.value));
  };
  const handleStoreNameChange = (event) => {
    setStoreName(event.target.value);
  };
  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };
  const handleStateNameChange = (event) => {
    setStateName(event.target.value);
  };

  const dispatch = useDispatch();
  const handleAddButtonClicked = () => {
    console.log("idName");
    if (id && store && city && state) {
      dispatch(itemsActions.addToItems({ id, store, city, state }));
    }
    setIdName("");
    setStoreName("");
    setCityName("");
    setStateName("");
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
            placeholder="Enter Store Name"
            value={store}
            onChange={handleStoreNameChange}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={handleCityNameChange}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            placeholder="Enter State"
            value={state}
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
            New Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewStore;
