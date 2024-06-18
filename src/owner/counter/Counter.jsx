// Counter.jsx

import React, { useEffect, useState } from "react";
import Menufooter from "../../components/Menufooter";
import Table from "./../../img/table3.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/counter.css";

const Counter = () => {
  const [tables, setTables] = useState([]);
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [orderPending, setOrderPending] = useState([]);

  console.log(tables)
  useEffect(() => {
    fetchData();
    fetchOrderPending();
  }, []);

  const fetchData = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id
        }/tables/list/`
      )
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderTableStatus = (table) => {
    return table.is_available ? "Available" : "Pending";
  };

  const getStatusClass = (table) => {
    return table.is_available ? "status-available" : "status-pending";
  };


  /* /============Reserve==========/  */
  const [tableNumber, setTableNumber] = useState("");
  const [reservedTables, setReservedTables] = useState([]);
  useEffect(() => {
    const storedTables =
      JSON.parse(localStorage.getItem("reservedTables")) || [];
    setReservedTables(storedTables);
  }, []);
  useEffect(() => {
    localStorage.setItem("reservedTables", JSON.stringify(reservedTables));
  }, [reservedTables]);
  const handleAdd = () => {
    if (tableNumber.trim() && !reservedTables.includes(tableNumber.trim())) {
      setReservedTables([...reservedTables, tableNumber.trim()]);
      setTableNumber("");
    }
  };
  const handleRemove = (index) => {
    const updatedTables = reservedTables.filter((_, i) => i !== index);
    setReservedTables(updatedTables);
  };

  const fetchOrderPending = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id
          }/table/1/pending-orders/`,
      };
      const response = await axios.request(config);
      setOrderPending(response.data);
    } catch (error) {
      console.error(error);
    }

  };
  console.log("11111111111", orderPending);


  return (
    <>
      <Menufooter />
      <div className="container-counter">
        <div className="contain-counter">
          <h2>Tables in Restaurant</h2>
          <div className="Reserve">
            <div className="colorBox_chContainer">
              <h3>Reserve a table number:</h3>
              <div className="addcolor_container">
                {reservedTables.map((number, index) => (
                  <div className="Card_boxColor" key={index}>
                    <span>{number}</span>
                    <span
                      className="spanCancelBox"
                      onClick={() => handleRemove(index)}
                      style={{ cursor: "pointer" }}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>

              <div className="addcolorContent">
                <input
                  className="inputBoxaddcolor"
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Enter reserve a table number"
                />
                <div className="btn_addcolorbox" onClick={handleAdd}>
                  Add
                </div>
              </div>
            </div>
          </div>
          <div className="container-table1">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`box-table ${getStatusClass(table)}`}
              >
                <div className="box-img-table">
                  <span className="box_numberorder">1</span>

                  <Link to={`/restaurant/orders/${table.id}`}>
                    <img src={Table} alt={`Table ${table.id}`} />
                    <h3>{`Table ${table.number}`} </h3>
                    <p>Status: {renderTableStatus(table)}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
