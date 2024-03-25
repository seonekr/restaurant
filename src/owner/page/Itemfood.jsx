import React, { useState } from "react";
import "./css/itemfood.css";
import foodImage from "../../img/foodImage.png";
import { Link } from "react-router-dom";
import foodImage2 from "../../img/foodImage2.jpg";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import iconshoppin1 from "../../img/iconshoppin1.png";

function Itemfood() {
  const products = [
    {
      id: 1,
      image: foodImage,
      name: "Product 1",
      // description: "1 description.",
      price: 29.99,
    },
    {
      id: 2,
      image: foodImage,
      name: "Product 2",
      price: 39.99,
    },
    {
      id: 3,
      image: foodImage,
      name: "Product 3",
      price: 49.99,
    },
    {
      id: 4,
      image: foodImage,
      name: "Product 4",
      price: 49.99,
    },
    {
      id: 4,
      image: foodImage,
      name: "Product 5",
      price: 49.99,
    },
    {
      id: 4,
      image: foodImage,
      name: "Product 6",
      price: 49.99,
    },
    {
      id: 4,
      image: foodImage,
      name: "Product 7",
      price: 49.99,
    },
    {
      id: 4,
      image: foodImage,
      name: "Product 8",
      price: 49.99,
    },
  ];

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
          <div className="filter">
            <div></div>
            <h3>Food</h3>
          </div>
          <div>
            <Link to="/addfood" className="boxAdd_food_btn">
              <img src={iconshoppin1} alt="" />
              <p>Add food</p>
            </Link>
          </div>
        </div>

        <div className="box_itemFood_container">
          {products.map((product) => (
            <Link to="#" className="box_itemFood" key={product.id}>
              <div className="box_itemFood_item" onClick={toggleisPopupfood}>
                <img src={product.image} alt="" />
                <div className="txt_boxDescription">
                  <p>{product.name}</p>
                  {/* <p>{product.description}</p> */}
                  <p>Price: ${product.price}</p>
                </div>
              </div>
              <Link
                to="#"
                className="icon_addcartTo"
                onClick={() => addToCart(product)}
              >
                <IoCartOutline className="icon_addcartToIN" />
              </Link>
            </Link>
          ))}
        </div>
        {cart.map((item) => (
          <div className="box_addTocart_content">
            <div> 1 View cart {item.price}</div>
          </div>
        ))}
      </div>

      {isPopupfood && (
        <div className="background_popup_box">
          <div className="foodDetails_container">
            <div className="goBack_foodDetails" onClick={toggleisPopupfood}>
              <IoClose className="goBack_foodDetails_icon" />
            </div>
            <div className="box_content_deatilsfood">
              <img src={foodImage2} alt="" />
            </div>
            <div className="details_food_box_item">
              <div className="box_gput_details">
                <h3>Name</h3>
                <p>100,000 Kip</p>
                <p>description</p>
              </div>
              <div className="write_moreBox">
                <h4>Special recommendations</h4>
                <p>Please tell us if you have any food allergies</p>
                <textarea
                  className="boxWrite_more"
                  rows="6"
                  cols="65"
                  placeholder="The cat was playing in the garden..."
                ></textarea>
              </div>
            </div>

            <div className="footer_foodDetails_box">
              <div className="DetailsFood_item_box">
                <div className="boxCount_numfood_foodDetails">
                  <p className="deleteIconCount">
                    <FaMinus />
                  </p>
                  <p className="countBtn_numberCount">1</p>
                  <p className="addIconCount">
                    <FaPlus />
                  </p>
                </div>
                <Link to="#" className="box_btnCON_addCart">
                  Cart to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Itemfood;
