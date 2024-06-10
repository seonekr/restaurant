import React, { useState } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import Swal from "sweetalert2";
import axios from 'axios';
import "./addtable.css";

const AddTable = ({ show, onClose, onSave }) => {
  const [tableNumber, setTableNumber] = useState("");

  const handleSave = async () => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    const restaurant_id = storage.restaurant_id;
    try {
      const data = new FormData();
      data.append("number", tableNumber);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API + `/restaurants/${restaurant_id}/tables/create/`,
        data: data
      };

      const response = await axios.request(config);

      if (response.status !== 201) {
        const errorText = response.statusText;
        console.error(`HTTP error! Status: ${response.status}, StatusText: ${errorText}`);
        throw new Error("Network response was not ok");
      }

      const dataResponse = response.data;
      console.log("Table saved:", dataResponse);

      Swal.fire({
        icon: "success",
        title: "Table Saved",
        text: `Table number ${dataResponse.number} was saved successfully!`,
      });

      onSave(dataResponse.number);
      setTableNumber("");
      onClose();
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      console.error("Error saving table:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `There was an error saving the table: ${error.message}`,
      });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <OwnerMenu />
      <div className="popup-overlay">
        <div className="popup-container">
          <h2>Add Table</h2>
          <input
            type="number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table number"
            className="input-number"
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTable;
