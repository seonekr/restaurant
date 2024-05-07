import React, { useState } from "react";
import "./css/cart.css";
import { Link } from "react-router-dom";
import foodImage from "../img/foodImage.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import Menufooter from "../components/Menufooter";
import { AiOutlineDelete } from "react-icons/ai";
import Alert2 from "../img/alert2.png";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
function Cart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: foodImage,
      name: "Margherita Pizza",
      price: 10.99,
      count: 1, // Initial count for product 1
    },
    {
      id: 2,
      image: foodImage,
      name: "Pepperoni Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 3,
      image: foodImage,
      name: "Hawaiian Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 4,
      image: foodImage,
      name: "Vegetarian Pizza",
      price: 11.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 5,
      image: foodImage,
      name: "Meat Lover's Pizza",
      price: 13.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 6,
      image: foodImage,
      name: "BBQ Chicken Pizza",
      price: 12.99,
      count: 1, // Initial count for product 2
    },
    {
      id: 7,
      image: foodImage,
      name: "Buffalo Chicken Pizza",
      price: 13.49,
      count: 1, // Initial count for product 2
    },
    {
      id: 8,
      image: foodImage,
      name: "Four Cheese Pizza",
      price: 11.99,
      count: 1, // Initial count for product 2
    },
  ]);

  const [showPopupOkDelete, setShowPopupOkDelete] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  const handleDelete = (productId) => {
    setProductToDeleteId(productId); // Set the ID of the product to delete
    setShowPopupOkDelete(true); // Show the delete confirmation popup
  };

  const togglePopupdialogokdelete = () => {
    setShowPopupOkDelete(!showPopupOkDelete);
  };

  const confirmDelete = () => {
    // Filter out the product to delete from the products list
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDeleteId)
    );
    setShowPopupOkDelete(false); // Close the delete confirmation popup after deletion
  };
  
// 
  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  const decrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };

  //
  const [showPopup, setShowPopup] = useState(false);
  const togglePopupdialog = () => {
    setShowPopup(!showPopup);
  };

  const [showPopupOk, setShowPopupOk] = useState(false);
  const togglePopupdialogok = () => {
    setShowPopupOk(!showPopupOk);
  };

  const handleOK = () => {
    window.location.href = "/order";
  };

  //

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);

        togglePopupdialogok(); // Assuming togglePopupdialogok toggles the dialog visibility
        setTimeout(() => {
          togglePopupdialog(); // Close the popup after another 2000 milliseconds
        }, 0);
      }, 2000);
    }
  };
  // Alert
  const [showPopupalert, setShowPopupalert] = useState(false);
  const handleNoProductAlert = () => {
    setShowPopupalert(!showPopupalert);
    // alert("Please add products to your cart before confirming your order.");
  };

  return (
    <>
      <Menufooter products={products} />

      <div className="cart_box_container">
        <div className="titleCart">
          <h2>Cart</h2>
        </div>

        <div className="box_cart_item_head">
          <h4>List menu:</h4>
        </div>

        <div className="box_groupaCart_item">
          <div className="box_content_cart">
            {products.map((product) => (
              <div className="foodDetails_box" key={product.id}>
                <div className="box_ofDetails_food">
                  <img src={product.image} alt={product.name} />
                  <div className="txt_ofDetails_food">
                    <p>{product.name}</p>
                    <p>$ {product.price}</p>
                  </div>
                </div>
                <div className="right_oflastDetailsFood">
                  <div
                    className="icon_DetailsFood"
                    // onClick={() => handleDelete(product.id)}
                    onClick={() => handleDelete(product.id)}
                  >
                    <AiOutlineDelete />
                  </div>
                  <div className="boxCount_numfood">
                    <p
                      className="deleteIconCount"
                      onClick={() => decrementCount(product.id)}
                    >
                      <FaMinus />
                    </p>
                    <p className="countBtn_numberCount">{product.count}</p>
                    <p
                      className="addIconCount"
                      onClick={() => incrementCount(product.id)}
                    >
                      <FaPlus />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="count_footmenu_box">
            <h3>Cart Total</h3>
            <div className="count_footmenu_box_content">
              <div className="count_footmenu_box_item_1">
                <p>Quantity:</p>
                <p>
                  {products.reduce(
                    (total, product) => total + product.count,
                    0
                  )}
                </p>
              </div>
              <div className="count_footmenu_box_item_2">
                <p>Total:</p>
                <p className="text-dollar">$</p>
                <p>
                  {products
                    .reduce(
                      (total, product) =>
                        parseInt(total) +
                        parseInt(product.count) * parseInt(product.price),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="btn-cart">
                <Link to="/" className="btn_Continues">
                  Continue Order
                </Link>
                {products.length > 0 ? (
                  <Link className="btn_confirmCart" onClick={togglePopupdialog}>
                    Confirm Order
                  </Link>
                ) : (
                  <Link
                    className="btn_confirmCart"
                    onClick={handleNoProductAlert}
                  >
                    Confirm Order
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="background_popup_dialog2">
          <div className="hover_popup_dialog2">
            <div className="box_input_dialog2">
              <Box
                sx={{
                  m: 2.5,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="primary"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    transition: "transform 0.2s ease-in-out", // Add smooth transition
                    "&:hover": {
                      transform: "scale(1.1)", // Scale up on hover
                    },
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <ErrorOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              <h3>Are you sure?</h3>
              <p>You want to order this</p>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupdialog}
              >
                CANCEL
              </button>
              <button
                className="btn_confirm btn_addproducttxt_popup"
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/*  */}
      {showPopupOk && (
        <div className="background_popup_dialog3">
          <div className="hover_popup_dialog3">
            <div className="box_input_dialog3">
              {/* <img src={Alert} alt="logo"></img> */}
              <Box
                sx={{
                  m: 6,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="primary"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    // marginRight: "16px", // Add margin between Fab and CircularProgress
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <ErrorOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>

              <h3>Your Order</h3>
              <p>Your order has been accepted</p>
              {/*  */}
            </div>
            <div className="btn_foasdf">
              <button
                className="btn-ok"
                onClick={handleOK}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delte */}
      {showPopupOkDelete && (
        <div className="background_popup_dialog2">
          <div className="hover_popup_dialog2">
            <div className="box_input_dialog2">
              <Box
                sx={{
                  m: 2.5,
                  position: "relative",
                  display: "inline-flex", // Use inline-flex to keep Fab and CircularProgress on the same line
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fab
                  aria-label="save"
                  color="error"
                  sx={{
                    ...buttonSx,
                    width: "70px",
                    height: "70px",
                    transition: "transform 0.2s ease-in-out", // Add smooth transition
                    "&:hover": {
                      transform: "scale(1.1)", // Scale up on hover
                    },
                  }}
                >
                  {success ? (
                    <CheckIcon fontSize="large" />
                  ) : (
                    <DeleteOutlineIcon fontSize="large" />
                  )}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={80}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>

              <h3>Are you sure?</h3>
              <p>You want to delete order this</p>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupdialogokdelete}
              >
                CANCEL
              </button>
              <button
                className="btn-delete"
                onClick={confirmDelete}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/*  */}
      {showPopupalert && (
        <div className="background_popup_alert">
          <div className="hover_popup_alert">
            <div className="box_input_alert">
              <img src={Alert2} alt="alert"></img>
              <h3>
                Please add products to your cart before confirming your order
              </h3>
            </div>
            <div className="btn_foasdf">
              <button className="btn_alert" onClick={handleNoProductAlert}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
