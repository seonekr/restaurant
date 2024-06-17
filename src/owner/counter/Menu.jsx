import React, { useEffect, useState, useContext } from "react";
import Menufooter from "../page/Menubar";
import "./css/menu.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import Ordermenu from "./Ordermenu";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import OrderDetail from "./OrderDetail";
import { AiOutlineDelete } from "react-icons/ai";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Menu = () => {
  const { tableId } = useParams();
  const storage = JSON.parse(localStorage.getItem("user"));
  const [table, setTable] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(true);
  const [errorTable, setErrorTable] = useState(null);
  const [errorMenus, setErrorMenus] = useState(null);
  const [errorOrderDetail, setErrorOrderDetail] = useState(null);

  useEffect(() => {
    fetchTable();
    fetchMenus();
    fetchOrderDetail();
  }, [storage.restaurant_id, tableId]);

  const fetchTable = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/tables/${tableId}/detail/`,
      };
      const response = await axios.request(config);
      setTable(response.data);
      setLoadingTable(false);
    } catch (error) {
      console.error(error);
      setErrorTable(error);
      setLoadingTable(false);
    }
  };

  const fetchMenus = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/menu_items/list/`,
      };
      const response = await axios.request(config);
      setMenus(response.data);
      setLoadingMenus(false);
    } catch (error) {
      console.error(error);
      setErrorMenus(error);
      setLoadingMenus(false);
    }
  };

  const fetchOrderDetail = async () => {
    setLoadingTable(true);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/table/${tableId}/latest/`,
      };
      const response = await axios.request(config);
      setOrderDetail(response.data);
      setLoadingOrderDetail(false);
    } catch (error) {
      console.error(error);
      setErrorOrderDetail(error);
      setLoadingOrderDetail(false);
    }
  };

  

  // if (loadingTable) {
  //   return <div>Loading...</div>;
  // }

  // if (errorTable) {
  //   return <div>Error loading data</div>;
  // }

  // if (!orderDetail || !orderDetail.order_items) {
  //   return <p>No order yet!</p>;
  // }

  console.log(orderDetail);

  return (
    <>
      <Menufooter />
      <div className="container-menu">
        <div className="contain-menu">
          <div className="title_header_order">
            <Link to="/counter" className="back_orderBox">
              <IoIosArrowBack className="icon_closeReviwe" />
              Back
            </Link>
          </div>
          <h2>Table {table.number}</h2>

          <div className="box_itemFood_container22">
            {menus.map((menu, index) => (
              <Link to="#" className="box_itemFood" key={index}>
                <div className="box_itemFood_item22">
                  <img src={menu.image} alt="" />
                  <div className="txt_boxDescription">
                    <div className="product-info-hp">
                      <p className="product-name-hp">{menu.name}</p>
                    </div>
                    <div className="product-info-hp">
                      <p className="product-price-hp">Price: {menu.price}</p>
                    </div>
                  </div>
                </div>
                <div className="icon_addcartTo">
                  <IoCartOutline className="icon_addcartToIN" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="contain-order">

          <div className="container-order-detail">
            <div className="contain-order-detail">
              <>
                {!orderDetail || !orderDetail.order_items ? (
                  <p>No order!</p>
                ) : (
                  <>
                    <h2>
                      Order #{orderDetail.id} || <strong>Paid:</strong>{" "} 
                      {orderDetail.paid ? "Yes" : "No"}
                    </h2>

                    <p>
                      <strong>Date:</strong> {new Date(orderDetail.timestamp).toLocaleString()}
                    </p>
                    <br />

                    <div className="order-list">
                      {orderDetail.order_items.map((menu, index) => (
                        <div className="test-text" key={index}>
                          <div className="box-txt-dtorder">
                            <div className="box-textorder">
                              <p>Name: {menu.menu_item.name}</p>
                              <p>Price: {menu.menu_item.price}</p>
                            </div>
                            <div className="box-txt-quantity">
                              <div className="right_oflastDetailsFood22">
                                <div className="icon_DetailsFood22">
                                  <AiOutlineDelete />
                                </div>
                                <div className="boxCount_numfood22">
                                  <p className="deleteIconCount22">
                                    <RemoveCircleOutlineIcon />
                                  </p>
                                  <p className="countBtn_numberCount">{menu.quantity}</p>
                                  <p className="addIconCount22">
                                    <ControlPointIcon />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3>Total Cost: ${orderDetail.total_cost}</h3>
                  </>
                )}

              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
