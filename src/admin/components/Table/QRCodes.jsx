import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./qrcode.css";

const QRCodes = ({ isOpen, onClose, selectedTableId }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/restaurant/tables/?restaurant_id=1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tables");
        }
        const data = await response.json();
        setTables(data);
      } catch (error) {
        setError(error.message); // Set error state if fetching fails
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTableId) {
      const table = tables.find((table) => table.id === selectedTableId);
      setSelectedTable(table);
    }
  }, [selectedTableId, tables]);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <OwnerMenu />
      <div className="board-qrcode">
        <Modal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          contentLabel="QR Code"
          className="qr-code-modal"
          overlayClassName="qr-code-overlay"
        >
          <div className="qr-code-container">
            {error ? ( // Display error message if there's an error
              <p>Error: {error}</p>
            ) : (
              <>
                {selectedTable && (
                  <div className="qr-code-display">
                    <h2>Scan the QR Code for Table {selectedTable.number}</h2>
                    {selectedTable.qr_code ? ( // Check if qr_code exists
                      <img
                        src={selectedTable.qr_code}
                        alt={`QR Code for Table ${selectedTable.id}`}
                      />
                    ) : (
                      <p>No QR code available</p>
                    )}
                  </div>
                )}
              </>
            )}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default QRCodes;
