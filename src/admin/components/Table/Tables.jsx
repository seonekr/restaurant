import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./table.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TableImage from "../../../img/table2.png";
import AddTable from "./Addtable";
import QRCodes from "./QRCodes";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/restaurant/tables/?restaurant_id=1")
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveTable = (tableNumber) => {
    axios
      .post("http://127.0.0.1:8000/restaurant/tables/", {
        restaurant_id: 1,
        table_number: tableNumber,
      })
      .then((response) => {
        setTables([...tables, response.data]);
      })
      .catch((error) => {
        console.error("Error saving table:", error);
      });
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };
  const handleCloseModal = () => {
    setSelectedTable(null);
    onClose();
  };
  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId); // Update selected table ID
    setIsQRModalOpen(true); // Open QR modal
  };
  

  const handleQRModalClose = () => {
    setIsQRModalOpen(false);
  };

  return (
    <>
      <OwnerMenu />
      <div className="board-table">
        <div className="container_box_table">
          <div className="box-add-table">
            <button onClick={handleOpenPopup} className="add_table_btn">
              {/* <img src={TableImage} alt="Add Table" /> */}
              <p>Add Table</p>
            </button>
          </div>
          <h2>Tables in Restaurant</h2>
          <div className="container-table-dash">
            {tables.map((table) => (
              <div key={table.id} className="box-table-dash">
                <div className="box-img-table-dash">
                  <Link to="#" onClick={() => handleTableClick(table.id)} className="Open">
                    <img src={TableImage} alt={`Table ${table.id}`} />
                    <h3>{`Table ${table.number}`}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <QRCodes isOpen={isQRModalOpen} onClose={handleQRModalClose} selectedTableId={selectedTableId} />
      <AddTable show={showPopup} onClose={handleClosePopup} onSave={handleSaveTable} />
    </>
  );
};

export default Tables;
