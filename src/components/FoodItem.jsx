import React, { useState, useEffect } from "react";
import "./css/foodItem.css";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import Cart from "../pages/Cart";

function FoodItem() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  // const [cart, setCart] = useState([]);
  const [quantity, set_quantity] = useState(1);

  const storage = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get(import.meta.env.VITE_API + `/restaurants/${storage.restaurant_id}/menu_items/list/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
// console.log("product0", products)
  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/restaurants/${storage.restaurant_id}/categories/list/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Add logic for sorting products based on selected option if needed
  };

  console.log("Category: ", categories);

  const filteredProducts = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  //
  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 } // Increment count or initialize to 0
          : product
      )
    );
  };

  //PopUp box food item
  const [isPopupfood, setisPopupfood] = useState(false);

  const toggleisPopupfood = () => {
    setisPopupfood(!isPopupfood);
  };



  // ============= Cart management ================

  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product, quantity = 1) => {
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

    alert("This product has been added to cart.");
};


  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/restaurants/1/menu_items/list/${products}/review`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const sortedReviews = response.data.sort((a, b) => b.id - a.id);
        setReviews(sortedReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [products]);

  return (
    <>
      <div className="container_boxcategory_hp">
        {categories.map((category, index) => (
          <div key={index}>
            <Link
              className="link_categor_l activeCategory"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="food_container_box">
        <div className="poster_food">
          <div className="filter2">
            <div></div>
            <h3>Food</h3>
          </div>
          {/* <div>
            <div className="dropdown-container">
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="dropdown-select"
              >
                <option value="">FILTER FOODS</option>
                <option value="newest">NEWEST</option>
                <option value="price h-l">PRICE (HIGH-LOW)</option>
                <option value="price l-h">PRICE (LOW-HIGH)</option>
                <option value="top seller">TOP SELLER</option>
              </select>
            </div>
          </div> */}
        </div>

        <div className="box_itemFood_container">
          {filteredProducts.map((product) => (
            <Link to="#" className="box_itemFood" key={product.id}>
              <div className="box_itemFood_item">
                <img src={product.image} alt="" />
                <div className="txt_boxDescription">
                  <div className="product-info-hp">
                    <p className="product-name-hp">{product.name}</p>
                  </div>
                  <div className="product-info-hp">
                    <p className="product-price-hp">Price: ${product.price}</p>
                  </div>
                </div>
              </div>
              <div
                className="icon_addcartTo"
              
              >
                <IoCartOutline
                  className="icon_addcartToIN"
                  // onClick={() => incrementCount(product.id)}
                  onClick={() => addToCart(product)}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Render cart here if needed */}
      {/* <Link to="/cart" className="box_addTocart_content-food">
  <div className="count_footmenu_box_item_22">
    <p>
      {cart.reduce(
        (total, item) => total + (item.quantity || 0), // Sum of quantities
        0
      )}
    </p>
    <p>View Cart</p>
    <p className="text-dollar">$</p>
    <p>
      {cart
        .reduce(
          (total, item) =>
            total + (item.quantity || 0) * parseFloat(item.price), // Sum of individual item prices
          0
        )
        .toFixed(2)}
    </p>
  </div>
</Link> */}

      {/* Cart Items */}
      {/* {cart.map((item) => (
  <div key={item.id} className="cart-item">
    <img src={item.image} alt={item.name} className="cart-item-image" />
    <div className="cart-item-details">
      <p className="cart-item-name">{item.name}</p>
      <p className="cart-item-quantity">Quantity: {item.quantity}</p>
      <p className="cart-item-price">
        Price: ${(parseFloat(item.price) * item.quantity).toFixed(2)}
      </p>
    </div>
  </div>
))} */}
    </>
  );
}

export default FoodItem;
