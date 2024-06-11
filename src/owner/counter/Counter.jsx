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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
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

  return (
    <>
      <Menufooter />
      <div className="container-counter">
        <div className="contain-counter">
          <h2>Tables in Restaurant</h2>
          <div className="container-table1">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`box-table ${getStatusClass(table)}`}
              >
                <div className="box-img-table">
                  <Link to={`/restaurant/orders/${table.id}`}>
                    <img src={Table} alt={`Table ${table.id}`} />
                    <h3>{`Table ${table.id}`} </h3>
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
