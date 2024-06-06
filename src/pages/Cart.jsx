import { useState, useEffect } from "react";
import "./css/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";
import Payment from "./Payment";

const useCart = () => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.name === product.name
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCarts = (id, store_name) => {
    setCart(
      cart.filter((item) => !(item.id === id && item.store_name === store_name))
    );
  };

  const updateQuantity2 = (id, store_name, quantity) => {
    if (quantity <= 0) {
      removeFromCarts(id, store_name);
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

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0
    );
  };

  const getTotalPriceForStore = (store_name) => {
    return cart
      .filter((item) => item.store_name === store_name)
      .reduce((total, item) => total + item.price * (item.quantity || 0), 0);
  };

  const getTotalItemForStore = (store_name) => {
    const storeItems = cart.filter((item) => item.store_name === store_name);
    return storeItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return {
    cart,
    setCart, // Added setCart to the returned object
    addToCart,
    removeFromCarts,
    updateQuantity2,
    getTotalItems,
    getTotalPrice,
    getTotalPriceForStore,
    getTotalItemForStore,
  };
};

const Cart = ({ products }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [store_id, set_store_id] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [show_payment, set_show_payment] = useState(false);
  const navigate = useNavigate();
  const user_id = user ? JSON.parse(user).user_id : null;

  const {
    cart,
    setCart, // Destructure setCart from useCart
    addToCart,
    removeFromCarts,
    updateQuantity2,
    getTotalItems,
    getTotalPrice,
    getTotalPriceForStore,
    getTotalItemForStore,
  } = useCart();

  const handlePayment = (store_name) => {
    const storeItems = cart.filter((item) => item.store_name === store_name);
    setCartItems(storeItems);
    set_store_id(storeItems[0]?.store_id || null);
    set_show_payment(true);
    setCart([]); // Clear the cart after setting the payment state
  };

  const orderitems = [
    {
      user: user_id,
      store: store_id,
      items: cartItems,
    },
  ];

  if (!cart) {
    return <div className="cart">Loading...</div>;
  }

  const stores = [...new Set(cart.map((item) => item.store_name))];

  return (
    <>
      {show_payment ? (
        <Payment orders={orderitems} />
      ) : (
        <>
          <Menufooter products={products} />
          <div className="cart_box_container112">
            <Link to="/" className="back_orderBox">
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
                                  onClick={() =>
                                    removeFromCarts(item.id, store)
                                  }
                                >
                                  <AiOutlineDelete />
                                </div>
                                <div className="boxCount_numfood">
                                  <p
                                    className="deleteIconCount"
                                    onClick={() =>
                                      updateQuantity2(
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
                                      updateQuantity2(
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
                            <p>{getTotalItemForStore(store)}</p>
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
                              onClick={() => handlePayment(store)}
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
