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
  const [orderDetails, setOrderDetails] = useState([]); // Initialize as null initially
  const [dateTime, setDateTime] = useState(new Date());

  // useEffect(() => {
  //   getOrderDetails();
  // }, []);

  // const getOrderDetails = () => {
  //   let data = "";

  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://127.0.0.1:8000/restaurants/1/orders/15/detail/",
  //     headers: {},
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setOrderDetails(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/restaurants/1/orders/18/detail/"
        );
        // Assuming response.data is an object representing a single order
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        // Handle error state or retry logic if needed
      }
    };

    getOrderDetails();
  }, []); //

  // Format date and time
  // const formattedDate = dateTime.toLocaleDateString();
  console.log("detail order", orderDetails);
  // if (!orderDetails) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Menufooter />
      <>
        <div className="order_box_container">
          <h3>Your Order</h3>
          <div className="box_firstOrder_content">
            {/* {orderDetails.items && (
              <div>
                {orderDetails.items.map((r) => (
                  <div className="text-data-order" key={r}>
                    <p>Order ID: {r.order}</p>
                    <p>Restaurant:</p>
                    <p>Table: </p>
                    <p>Customer name: {r.user}</p>
                    <p>Staff: {r.employee}</p>
                    <p>Date: </p>
                    <p>Status: order.status</p>
                    <p>Paid: order.paid ? "Yes" : "No"</p>
                    <p>Total Cost: $order.total_cost</p>
                  </div>
                ))}
              </div>
            )} */}

            <h4>List menu:</h4>
            {orderDetails.items && (
              <>
                {orderDetails.items.map((r) => (
                  <div className="test-text">
                    <p>{r.menu_item}</p>
                    <p>{r.quantity}</p>
                  </div>
                ))}
              </>
            )}
            <p>
             
              Date:
               {orderDetails.timestamp}
            </p>
           
            {/* {orderDetails.items && (
              <div>
                {orderDetails.items.map((r) => (
                  <div className="order_contentItem" key={r}>
                    <div>
                      <h4>Menu Item</h4>
                      <div className="boxGrouptxtintro boxofnamefood">
                        <p>{r.menu_item}</p>
                      </div>
                    </div>

                    <div>
                      <h4>Quantity</h4>
                      <div className="boxGrouptxtintro">
                        <p>{r.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            <div className="box_groupPrice_2">
              <h4>Total Items: </h4>
              <h4 className="text-dollar">${orderDetails.total_cost}</h4>
              <h4></h4>
            </div>

            <div className="boxgroupLastfoot">
              <p>Current Date:</p>
              <p>Payment method: BCEL-ONEPAY</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Order;
