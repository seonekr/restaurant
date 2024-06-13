import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./css/cart.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";

const useCart = () => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id && item.store_name === product.store_name
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id, store_name) => {
    setCart(
      cart.filter((item) => !(item.id === id && item.store_name === store_name))
    );
  };

  const updateQuantity = (id, store_name, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, store_name);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.store_name === store_name
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getTotalPriceForStore = (store_name) => {
    return cart
      .filter((item) => item.store_name === store_name)
      .reduce((total, item) => total + item.price * (item.quantity || 0), 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPriceForStore,
  };
};



const Cart = ({ products }) => {
  const [storeId, setStoreId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPriceForStore,
  } = useCart();
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).user_id
    : null;

  const stores = [...new Set(cart.map((item) => item.store_name))];


  // Prepare datas before ordering
  const [loading, isLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState(cart[0].restaurant_id);
  const [table, setTable] = useState(cart[0].table_id);
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [paid, setPaid] = useState(false);
  const [orderItems, setOrderItems] = useState([]);



  console.log("####################################");
  console.log("restaurantId: ", restaurantId);
  console.log("table: ", table);
  console.log("user: ", user);
  console.log("employee: ", employee);
  console.log("status: ", status);
  console.log("paid: ", paid);
  console.log("orderItems: ", orderItems);
  console.log("####################################");

  const handleConfirmPayment = async (event) => {
    event.preventDefault();

    try {
      const orderData = {
        restaurant: restaurantId,
        table: table,
        user: user,
        employee: employee,
        status: status,
        paid: paid,
        order_items: cart.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          employee: parseInt(employee),
        })),
      };

      const response = await axios.post(
        import.meta.env.VITE_API +
          `/restaurants/${restaurantId}/table/${table}/create_or_update/`,
        orderData
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Order confirmed successfully!",
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error("Failed to confirm order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to confirm order. Please try again.",
      });
    }
  };

  const handleSubmit = async function createOrUpdateOrder() {
    let isLoading = true;

    try {
      let data = JSON.stringify({
        restaurant: restaurantId,
        table: table,
        user: user,
        employee: employee,
        status: "PENDING",
        paid: false,
        order_items: cart.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          employee: employee,
        })),
        // order_items: [
        //   {
        //     menu_item: 1,
        //     quantity: 9,
        //     employee: 1,
        //   },
        //   {
        //     menu_item: 2,
        //     quantity: 6,
        //     employee: 1,
        //   },
        // ],
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url:
          import.meta.env.VITE_API +
          `/restaurants/${restaurantId}/table/${table}/create_or_update/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log("Loading...");

      const response = await axios.request(config);
      // console.log("Response:", JSON.stringify(response.data));
      alert("Success.");
      // Remove the cart from localStorage
      localStorage.removeItem("cart");
      navigate("/home")
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // No response received from the server
        console.error("Error Request:", error.request);
      } else {
        // Something else caused the error
        console.error("Error", error.message);
      }
    } finally {
      isLoading = false;
      console.log("Loading finished.");
    }
  };

  return (
    <>
      {showPayment ? (
        <Payment orders={[{ user: userId, store: storeId, items: cart }]} />
      ) : (
        <>
          <Menufooter products={products} />
          <div className="cart_box_container112">
            <Link to="/home" className="back_orderBox">
              <IoIosArrowBack id="icons_back" />
              <p>Back</p>
            </Link>
            <div className="container-box-order">
              <h2>Cart</h2>
              {stores.length === 0 ? (
                <p className="no-reviews-message">No Products</p>
              ) : (
                stores.map((store) => (
                  <div className="box_cart_item_head1" key={store}>
                    <h3>List menu:</h3>
                    <div className="box_groupaCart_item1">
                      <div className="box_content_cart1">
                        {cart
                          .filter((item) => item.store_name === store)
                          .map((item) => (
                            <div className="foodDetails_box" key={item.id}>
                              <div className="box_ofDetails_food">
                                <img src={item.image} alt={item.name} />
                                <div className="txt_ofDetails_food">
                                  <p>{item.name}</p>
                                  <p>$ {item.price}</p>
                                </div>
                              </div>
                              <div className="right_oflastDetailsFood">
                                <div
                                  className="icon_DetailsFood"
                                  onClick={() => removeFromCart(item.id, store)}
                                >
                                  <AiOutlineDelete />
                                </div>
                                <div className="boxCount_numfood">
                                  <p
                                    className="deleteIconCount"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.store_name,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </p>
                                  <p className="countBtn_numberCount">
                                    {item.quantity}
                                  </p>
                                  <p
                                    className="addIconCount"
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.store_name,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <FaPlus />
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="count_footmenu_box">
                        <h3>Cart Total for {store}</h3>
                        <div className="count_footmenu_box_content">
                          <div className="count_footmenu_box_item_1">
                            <p>Quantity:</p>
                            <p>{getTotalItems()}</p>
                          </div>
                          <div className="count_footmenu_box_item_2">
                            <h3>Total: </h3>
                            <p className="text-dollar">$</p>
                            <p>{getTotalPriceForStore(store).toFixed(2)}</p>
                          </div>
                          <div className="btn-cart2">
                            <div className="btn_Continues">
                              <Link to="/" className="blue-link">
                                Continue Order
                              </Link>
                            </div>
                            <div
                              onClick={handleSubmit}
                              className="btn_confirmCart"
                            >
                              Confirm Order
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
