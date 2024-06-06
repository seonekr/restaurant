import React, { useState, useEffect } from "react";
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import { Link } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { LuChefHat } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/restaurants/1/orders/5/detail/"
      );
      setOrderDetails(response.data.items); // Assuming the response has an `items` array
      setTotalCost(response.data.total_cost);
      setTimestamp(response.data.timestamp);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <>
      <Menufooter />
      <div className="order_box_container">
        <Link to="/" className="back_orderBox">
          <IoIosArrowBack id="icons_back" />
          <p>Back</p>
        </Link>
        <h3>Your Order</h3>
        <div className="box_firstOrder_content">
          <h4>List menu:</h4>
          {orderDetails.length > 0 ? (
            orderDetails.map((order, index) => (
              <div className="order_contentItem" key={index}>
                <div>
                  <h4>Menu Item</h4>
                  <div className="boxGrouptxtintro boxofnamefood">
                    <p>{order.name}</p>
                  </div>
                </div>

                <div>
                  <h4>Quantity</h4>
                  <div className="boxGrouptxtintro">
                    <p>{order.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in your order.</p>
          )}
          <div className="box_groupPrice_2">
            <h4>Total Cost: </h4>
            <h4 className="text-dollar">${totalCost}</h4>
          </div>
          <div className="boxgroupLastfoot">
            <p>Current Date: {new Date(timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
