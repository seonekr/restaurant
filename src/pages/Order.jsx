import React, { useState, useEffect } from "react";
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import axios from "axios";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState(null); // Initialize as null for single order object
  const [menuDetails, setMenuDetails] = useState([]); // Initialize as empty array for menu items

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/restaurants/1/orders/18/detail/"
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    getOrderDetails();
  }, []);

  useEffect(() => {
    const getMenuDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/restaurants/1/menu_items/list/"
        );
        setMenuDetails(response.data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    getMenuDetails();
  }, []);

  console.log("detail order", orderDetails);
  console.log("detail menu", menuDetails);

  return (
    <>
      <Menufooter />
      <div className="order_box_container">
        <h3>Your Order</h3>
        <div className="box_firstOrder_content">
          <h4>List menu:</h4>
          {orderDetails && orderDetails.items && (
            <>
              {orderDetails.items.map((item) => {
                const menuItem = menuDetails.find(
                  (menu) => menu.id === item.menu_item
                );
                return (
                  <div className="test-text" key={item.id}>
                    <p>{menuItem ? menuItem.name : "Unknown"}</p>
                    <p>{menuItem ? `$${menuItem.price}` : "Unknown"}</p>
                    <p>{item.quantity}</p>
                  </div>
                );
              })}
            </>
          )}
          <div className="box_groupPrice_2">
            <h4 className="text-dollar">
              ${orderDetails ? orderDetails.total_cost : "Loading..."}
            </h4>
            <h4></h4>
          </div>
          <div className="boxgroupLastfoot">
            <p>
              Current Date:{" "}
              {orderDetails ? orderDetails.timestamp : "Loading..."}
            </p>
            {/* <p>Payment method: BCEL-ONEPAY</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
