import React, { useState, useEffect } from "react";
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import { Link } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { LuChefHat } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import foodImage from "../img/foodImage.png";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/restaurants/1/orders/15/detail/",
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Format date and time
  const formattedDate = dateTime.toLocaleDateString();
  console.log("detail order", orderDetails.id);
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  // const { id, restaurant, table, user, employee, timestamp, status, paid, total_cost, status_history, items } = orderDetails;

  return (
    <>
      <Menufooter />
      {/* {orderDetails.map((order) => (
        <div className="order_box_container">
          <h3>Your Order</h3>
          <div className="box_firstOrder_content">
            <div className="text-data-order">
              <p>Order ID: {order.id}</p>
              <p>Restaurant: {order.restaurant}</p>
              <p>Table: {order.table}</p>
              <p>Customer name: {order.user}</p>
              <p>Staff: {order.employee}</p>
              <p>Date: {new Date(order.timestamp).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Paid: {order.paid ? "Yes" : "No"}</p>
              <p>Total Cost: ${order.total_cost}</p>
            </div>

            <h4>List menu:</h4>
            <div className="order_contentItem">
              <div>
                <h4>Menu Item</h4>
                <div className="boxGrouptxtintro boxofnamefood">
             
                    <p >{order.menu_item}</p>
              
                </div>
              </div>

              <div>
                <h4>Quantity</h4>
                <div className="boxGrouptxtintro">
          
                    <p>15</p>
                 
                </div>
              </div>
            </div>

            <div className="box_groupPrice_2">
              <h4>Total Items: {order.length}</h4>
              <h4 className="text-dollar">$</h4>
              <h4>{total_cost.toFixed(2)}</h4>
            </div>

            <div className="boxgroupLastfoot">
              <p>Current Date: {formattedDate}</p>
              <p>Payment method: BCEL-ONEPAY</p>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default Order;
