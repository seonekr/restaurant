import React, { useState } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import Swal from "sweetalert2";
import axios from 'axios'; // Ensure you have this import
import "./addtable.css";

const Addtable = ({ show, onClose, onSave }) => {
  const [tableNumber, setTableNumber] = useState("");

  const handleSave = async () => {
    try {
      // Create a FormData object and append the table number
      const data = new FormData();
      data.append("number", tableNumber);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API +  "/restaurants/1/tables/create/?number=150",
        data: data // Include the data in the request
      };

      const response = await axios.request(config);

      if (!response.status === 200) {
        const errorText = response.statusText;
        console.error(
          `HTTP error! Status: ${response.status}, StatusText: ${errorText}`
        );
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

export default Addtable;
