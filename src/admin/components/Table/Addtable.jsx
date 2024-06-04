import React, { useState } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import Swal from "sweetalert2";
import "./addtable.css";

const Addtable = ({ show, onClose, onSave }) => {
  const [tableNumber, setTableNumber] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/restaurant/tables/?restaurant_id=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: tableNumber,
          restaurant: 1 // Assuming you need to pass the restaurant ID here
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}, Body: ${errorText}`);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Table saved:", data);

      Swal.fire({
        icon: 'success',
        title: 'Table Saved',
        text: `Table number ${data.number} was saved successfully!`,
      });

      onSave(data.number);
      setTableNumber("");
      onClose();
    } catch (error) {
      console.error("Error saving table:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
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
