import React from "react";
import "./board.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import iconshoppin1 from "../../../img/iconshoppin1.png";
import { IoFastFood } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import AdminMenu from "../ownerMenu/OwnerMenu";

const Board = () => {
  const token = localStorage.getItem("token");
  var store_id = false;
  if (localStorage.getItem("user")) {
    store_id = JSON.parse(window.localStorage.getItem("user")).store_id;
  }

  const [pending, set_pending] = useState(0);
  const [processing, set_processing] = useState(0);
  const [shipped, set_shipped] = useState(0);
  const [delivered, set_delivered] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.data.result != "success") {
          localStorage.clear();
          navigate("/loginuser");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/loginuser");
        return;
      });
  }, [token]);

  useEffect(() => {
    NewOrders();
    ProcessingOrders();
    ShippedOrders();
    DeliveredOrders();
  }, []);

  const NewOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        import.meta.env.VITE_API + `/store/order/pending/?store_id=${store_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_pending(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ProcessingOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        import.meta.env.VITE_API +
        `/store/order/processing/?store_id=${store_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_processing(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShippedOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        import.meta.env.VITE_API + `/store/order/shipped/?store_id=${store_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_shipped(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeliveredOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        import.meta.env.VITE_API +
        `/store/order/delivered/?store_id=${store_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_delivered(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AdminMenu />
      <section>
        <div className="boxspentainer"></div>
        <div className="board">
   
            <div className="title_header_orderBox">
              <Link to="/mainpage" className="back_orderBox">
                <IoIosArrowBack className="icon_closeReviwe" />
                Back
              </Link>
              <h4>Dashboard</h4>
            </div>
            <div className="box-dashboard">
              <div className="box-dash1">
                <div className="box-text">
                  <div className="box-text1">
                    <h3>Something</h3>
                  </div>
                  <div className="box-text2">
                    <Link to="/dashboardpc" className="export_btn">
                      <img src={iconshoppin1} alt="" />
                      <p>Export</p>
                    </Link>
                  </div>
                </div>
                <div className="box-continer-in">
                  <div className="box-continer-order">
                    <div className="box-text-order">
                      <div className="icon-test-order">
                        <IoFastFood />
                      </div>
                      <h4>Order</h4>
                      <h3>5</h3>
                      <p>View More</p>
                    </div>
                  </div>
                  <div className="box-continer-message">
                    <div className="box-text-message">
                      <div className="icon-test-message">
                        <IoChatbox />
                      </div>
                      <h4>Message</h4>
                      <h3>19</h3>
                      <p>View More</p>
                    </div>
                  </div>
                  <div className="box-continer-food">
                    <div className="box-text-food">
                      <div className="icon-test-list">
                        <IoList />
                      </div>
                      <h4>Food list</h4>
                      <h3>5</h3>
                      <p>View More</p>
                    </div>
                  </div>
                  <div className="box-continer-review">
                    <div className="box-text-review">
                      <div className="icon-test-review">
                        <IoStar />
                      </div>
                      <h4>Review</h4>
                      <h3>8</h3>
                      <p>View More</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dash2">
                <div className="box-text-dash2">
                  <div className="text-dash1">
                    <h4>Sales</h4>
                  </div>
                  <div className="text-dash2">
                    <select name="month" id="month">
                      <option value="">Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                </div>
                <div className="box-text2-dash2">
                  <div className="text-dash-1">
                    <p>This month's sales:</p>
                    <h4>2,000$</h4>
                  </div>
                  <div className="text-dash-2">
                    <p>All quanlity:</p>
                    <h4>100</h4>
                  </div>
                </div>
                <div className="box-continer-history">
                  <div className="box-text-history">
                    <div className="icon-test-history">
                      <IoTime />
                    </div>
                    <h4>History</h4>
                    <h3>4</h3>
                    <Link to="/history">
                      <p>View More</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-dash3">
              <div className="products-visit1">
                <div className="products">
                  <h3>Top Products</h3>
                  <div className="item_guopBox">
                    <div className="items">
                      <h4>#</h4>
                      <h4 className="name">name</h4>
                      <h4>Quantity</h4>
                      <h4>Popularity</h4>
                      <h4>Sales</h4>
                    </div>
                    <div className="items">
                      <span>01</span>
                      <span className="p1">Home Decor Range</span>
                      <span>20</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="180"
                          height="4"
                          viewBox="0 0 180 4"
                          fill="none"
                        >
                          <rect width="180" height="4" rx="2" fill="#CDE7FF" />
                          <rect width="81" height="4" rx="2" fill="#0095FF" />
                        </svg>
                      </span>
                      <span className="sales_persian sales_an1">45%</span>
                    </div>
                    <div className="items">
                      <span>02</span>
                      <span className="p1">Disney Princess Pink Bag 18'</span>
                      <span>20</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="180"
                          height="4"
                          viewBox="0 0 180 4"
                          fill="none"
                        >
                          <rect width="180" height="4" rx="2" fill="#8CFAC7" />
                          <rect width="52.2" height="4" rx="2" fill="#00E096" />
                        </svg>
                      </span>
                      <span className="sales_persian sales_an2">29%</span>
                    </div>
                    <div className="items">
                      <span>03</span>
                      <span className="p1"> Bathroom Essentials</span>
                      <span>20</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="180"
                          height="4"
                          viewBox="0 0 180 4"
                          fill="none"
                        >
                          <rect width="180" height="4" rx="2" fill="#C5A8FF" />
                          <rect width="32.2" height="4" rx="2" fill="#884DFF" />
                        </svg>
                      </span>
                      <span className="sales_persian sales_an3">18%</span>
                    </div>
                    <div className="items">
                      <span>04</span>
                      <span className="p1">Apple Smartwatches</span>
                      <span>20</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="180"
                          height="4"
                          viewBox="0 0 180 4"
                          fill="none"
                        >
                          <rect width="180" height="4" rx="2" fill="#FFD5A4" />
                          <rect width="45" height="4" rx="2" fill="#FF8F0D" />
                        </svg>
                      </span>
                      <span className="sales_persian sales_an4">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </section>
    </>
  );
};

export default Board;
