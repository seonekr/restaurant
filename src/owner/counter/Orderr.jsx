import React, { useState, useEffect } from "react";
import "./css/order.css"; // Import CSS for Orderr component
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Swal from "sweetalert2"; // Import SweetAlert2

const Orderr = ({
  order,
  itemDetails,
  totalPrice,
  clearOrders,
  totalQuantity,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isPaid, setIsPaid] = useState(false); // State to track whether the order is paid
  const [Employees, setEmployees] = useState([]);
  const [employeeRole, setEmployeeRole] = useState(""); // State to store employee role

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/restaurant/employees/`, {
        // You may need to pass authentication headers here
        // headers: {
        //   Authorization: `Bearer ${accessToken}`
        // }
      })
      .then((response) => {
        // Assuming the response data contains the user's role
        setEmployeeRole(response.data.role);
      })
      .catch((error) => {
        console.error("Error fetching employee role:", error);
      });
  }, []);

  const handleConfirm = () => {
    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          restaurant: order.restaurant_id,
          table: order.table,
          order_items: order.order_items.map((item) => ({
            menu_item: item.menu_item,
            quantity: item.quantity,
          })),
          total_price: totalPrice,
          is_paid: isPaid,
          order_date: getCurrentDateTime(),
          status: "COMPLETED", // Adding status field with value "Complete"
        };

        axios
          .post(`http://127.0.0.1:8000/restaurant/orders/`, data)
          .then((response) => {
            console.log("Order saved successfully:", response.data);
            navigate("/counter");
            clearOrders();
            Swal.fire({
              title: "Order Confirmed!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error saving order:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to save order. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePaidToggle = () => {
    setIsPaid(!isPaid); // Toggle the state of isPaid
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date().toLocaleDateString();
    return `${currentDateTime}`;
  };

  return (
    <div className="bill">
      <h2>Bill</h2>
      {employeeRole && <h4>Employee Role: {employeeRole}</h4>}
      <div className="Date-box">
        <h4>Order: {order.id}</h4>
        <p>Date: {getCurrentDateTime()}</p>
      </div>
      <ul>
        {order.order_items.map((item) => (
          <li key={item.id}>
            <div className="box-menu">
              <span>{itemDetails[item.menu_item]?.name}</span>
              <span> x {item.quantity}</span>
              <span>${itemDetails[item.menu_item]?.price * item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-bill">
        <h3>Quantity: {totalQuantity}</h3>
        <h3>Total: ${totalPrice}</h3>
      </div>
      <div className="checkbox-container">
        <label>
          <input type="checkbox" checked={isPaid} onChange={handlePaidToggle} />
          Paid
        </label>
      </div>
      <div className="btn-cf-order">
        <Link className="confirm-link" onClick={handleConfirm}>
          Confirm
        </Link>
      </div>
    </div>
  );
};

export default Orderr;
