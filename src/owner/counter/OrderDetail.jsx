import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menufooter from "../../components/Menufooter";
import "./css/orderDetail.css"; // Ensure you have this CSS file for styling
import { AiOutlineDelete } from "react-icons/ai";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const OrderDetail = () => {
  const { tableId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
    fetchMenuDetails();
  }, [tableId]);

  const fetchOrderDetails = () => {
    axios
      .get(`http://127.0.0.1:8000/restaurants/1/orders/list/`)
      .then((response) => {
        const filteredOrders = response.data.filter(
          (order) =>
            order.table === parseInt(tableId) &&
            (order.status === "PENDING" ||
              order.status === "PREPARING" ||
              order.status === "READY")
        );
        if (filteredOrders.length > 0) {
          setOrderDetails(filteredOrders[0]); // Assuming you want to show details of the first matching order
        } else {
          setOrderDetails(null); // No matching order found
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMenuDetails = () => {
    axios
      .get(`http://127.0.0.1:8000/restaurants/1/menu_items/list/`)
      .then((response) => {
        setMenuDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteOrderItem = (itemId) => {
    const requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:8000/restaurants/1/order-items/${itemId}/cancel/`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to cancel order item");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Order item cancelled successfully:", result);
        // After successful deletion, refetch order details
        fetchOrderDetails();
      })
      .catch((error) => console.error("Error cancelling order item:", error));
  };

  
  return (
    <>
      <div className="container-order-detail">
        <div className="contain-order-detail">
          {orderDetails ? (
            <>
              <h2>Order #{orderDetails.id}</h2>
              <div className="order-list">
                {orderDetails.items.map((item) => {
                  const menuItem = menuDetails.find(
                    (menu) => menu.id === item.menu_item
                  );
                  return (
                    <div className="test-text" key={item.id}>
                      <div className="box-txt-dtorder">
                        <div className="box-textorder">
                          <p>{menuItem ? menuItem.name : "Unknown"}</p>
                          <p>{menuItem ? `$${menuItem.price}` : "Unknown"}</p>
                        </div>
                        <div className="box-txt-quantity">
                          <div className="right_oflastDetailsFood22">
                            <div className="icon_DetailsFood22">
                              <AiOutlineDelete
                                onClick={() => deleteOrderItem(item.id)}
                              />
                            </div>
                            <div className="boxCount_numfood22">
                              <p className="deleteIconCount22">
                                <RemoveCircleOutlineIcon />
                              </p>
                              <p className="countBtn_numberCount">
                                {item.quantity}
                              </p>
                              <p className="addIconCount22">
                                <ControlPointIcon />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <p>
                       
                        {item.quantity}
                      </p> */}
                      {/* <div className="box-txt-quantity">
                    <div className="right_oflastDetailsFood22">
                      <div className="icon_DetailsFood22">
                        <AiOutlineDelete
                        />
                      </div>
                      <div className="boxCount_numfood22">
                        <p
                          className="deleteIconCount22"
                          
                        >
                          <RemoveCircleOutlineIcon />
                        </p>
                        <p className="countBtn_numberCount">{item.quantity}</p>
                        <p
                          className="addIconCount22"
                      
                          
                        >
                          <ControlPointIcon />
                        </p>
                      </div>
                    </div>
                  </div> */}
                    </div>
                  );
                })}
              </div>
              <p>Total Cost: ${orderDetails.total_cost}</p>
            </>
          ) : (
            <p>No pending orders found for this table.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
