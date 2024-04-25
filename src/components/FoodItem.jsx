import React, { useState } from "react";
import "./css/foodItem.css";
import foodImage from "../img/foodImage.png";
import { Link } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import "../pages/css/homePage.css";

function FoodItem() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: foodImage,
      name: "Margherita Pizza",
      price: 10.99,
      count: 0, // Initial count for product 1
    },
    {
      id: 2,
      image: foodImage,
      name: "Pepperoni Pizza",
      price: 11.99,
      count: 0, // Initial count for product 2
    },
    {
      id: 3,
      image: foodImage,
      name: "Hawaiian Pizza",
      price: 12.99,
      count: 0, // Initial count for product 2
    },
    {
      id: 4,
      image: foodImage,
      name: "Vegetarian Pizza",
      price: 11.49,
      count: 0, // Initial count for product 2
    },
    {
      id: 5,
      image: foodImage,
      name: "Meat Lover's Pizza",
      price: 13.99,
      count: 0, // Initial count for product 2
    },
    {
      id: 6,
      image: foodImage,
      name: "BBQ Chicken Pizza",
      price: 12.99,
      count: 0, // Initial count for product 2
    },
    {
      id: 7,
      image: foodImage,
      name: "Buffalo Chicken Pizza",
      price: 13.49,
      count: 0, // Initial count for product 2
    },
    {
      id: 8,
      image: foodImage,
      name: "Four Cheese Pizza",
      price: 11.99,
      count: 0, // Initial count for product 2
    },
    // Add count property for other products as needed
  ]);

  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };

  
  //PopUp box food item
  const [isPopupfood, setisPopupfood] = useState(false);

  const toggleisPopupfood = () => {
    setisPopupfood(!isPopupfood);
  };

  // Add To Cart
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  //drop dowm
  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="food_container_box">
        <div className="poster_food">
          <div className="filter2">
            <div></div>
            <h3>Food</h3>
          </div>
          <div>
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
          </div>
        </div>

        <div className="box_itemFood_container">
          {products.map((product) => (
            <Link to="#" className="box_itemFood" key={product.id}>
              <div className="box_itemFood_item" onClick={toggleisPopupfood}>
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
              <Link
                to="#"
                className="icon_addcartTo"
                onClick={() => addToCart(product)}
              >
                <IoCartOutline
                  className="icon_addcartToIN"
                  onClick={() => incrementCount(product.id)}
                />
              </Link>
            </Link>
          ))}
        </div>
        {cart.map((item) => (
          <Link to="/cart">
            <div className="box_addTocart_content-food">
              <div className="count_footmenu_box_item_22">
                <p>
                  {products.reduce(
                    (total, product) => total + product.count,
                    0
                  )}
                </p>
                <p>View Cart</p>
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
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default FoodItem;
