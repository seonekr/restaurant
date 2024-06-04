import React, { useEffect, useState } from "react";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import "./css/manageorder.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
const Manageorder = () => {
  const [tables, setTables] = useState([]);

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

  const renderTableStatus = (table) => {
    return table.is_available ? "Available" : "Pending";
  };

  return (
    <div className="manageorder_box_container">
      <div className="title_header_orderBox">
        <Link to="/mainpage" className="back_orderBox">
          <IoIosArrowBack className="icon_closeReviwe" />
          Back
        </Link>
        <h3 className="txttitle_manageorder">Order</h3>
      </div>
      <div className="manageorder_container_box">
        <div className="box_content_manageorder">
          {tables.map((table) => (
            <div key={table.id} className="box_txt_orderlist">
              <div className="txtname_orderlist22">
                <div className="txt-text-table">
                  <h3>{`Table ${table.number}`} </h3>
                  <p>Status: {renderTableStatus(table)}</p>
                </div>

                <Link
                  to={`/restaurants/orders/${table.id}`}
                  className="btnViewMoew_order"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Menufooter />
    </div>
  );
};

export default Manageorder;
