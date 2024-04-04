import React, { useState } from "react";
import "./css/itemfood.css";
import foodImage from "../../img/foodImage.png";
import { Link } from "react-router-dom";
import imageicon from "../../img/imageicon.jpg";

import foodImage2 from "../../img/foodImage2.jpg";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import iconshoppin1 from "../../img/iconshoppin1.png";
import { FaPencil } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

import axios from "axios";

function Itemfood() {
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const [products, setProducts] = useState([
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
  ]);
  // const products = ;

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

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [pro, setPro] = useState("");

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    setPro(id);
  };

  const handleSubmit = (event) => {
    event.preventDefualt();
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };
  const [mainImageBanner, setMainImageBanner] = useState(null);

  // Popup Edit Image
  const [isOpenimage, setIsOpenimage] = useState(false);
  const togglePopupimage = () => {
    setIsOpenimage(!isOpenimage);
  };
    ///Choose image handleImage
    const handleImage = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setMainImage([file]);
        };
  
        reader.readAsDataURL(file);
      }
    };
  
  return (
    <>
      <div className="food_container_box-main">
        <div className="poster_food">
          <div className="filter">
            <div></div>

            <h3>Food</h3>
          </div>

          <div>
            <Link to="/addproduct" className="add_food_btn">
              <img src={iconshoppin1} alt="" />
              <p>Add food</p>
            </Link>
          </div>
        </div>

        <div className="box_itemFood_container">
          {products.map((product, id) => (
            <Link to="#" className="box_itemFood" key={id}>
              <div className="box_itemFood_item">
                <img src={product.image} alt="" onClick={toggleisPopupfood} />
                <div
                  className="deleteBox_productcontent"
                  onClick={() => handleDelete(id)}
                >
                  <AiOutlineDelete />
                </div>
                <div className="icon_cameraDp22">
                  <IoCamera onClick={togglePopupimage} />
                </div>
                <div className="txt_boxDescription3">
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <div className="edit-icon-name">
                      <FaPencil onClick={() => togglePopup(product.id)} />
                    </div>
                  </div>
                  <div className="product-info">
                    <p className="product-price">Price: ${product.price}</p>
                    <div className="edit-icon-price">
                      <FaPencil onClick={togglePopup2} />
                    </div>
                  </div>
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
      {/* Popup Edit Logo */}
      {isOpenimage && (
       <form className="popup-image">
       <div className="popup-content-image">
         <div className="box_input_image">
           <h2>Add banner mage</h2>

           <div className="input-container2">
             {mainImageBanner && mainImageBanner.length > 0 ? (
               <img
                 src={URL.createObjectURL(mainImageBanner[0])}
                 alt="Banner"
               />
             ) : (
               <img src={imageicon} alt="Banner" />
             )}
           </div>

           <label className="popup_Border_Boximagae">
             <input
               type="file"
               id="img"
               onChange={handleImage}
               required
             />
             <IoImageOutline className="icon_cameraDp2" />
             <span className="file-upload-text">Choose Image...</span>
           </label>
         </div>
         <div className="btn_foasdf">
           <button
             className="btn_cancel btn_addproducttxt_popup"
             onClick={togglePopupimage}
           >
             CANCEL
           </button>
           <button className="btn_confirm btn_addproducttxt_popup">
             OK
           </button>
         </div>
       </div>
     </form>
      )}
      {/*  */}
      {isOpen && (
        <div className="background_addproductpopup_box2">
          <div className="hover_addproductpopup_box2">
            <div className="box_input2">
              <p>Add product name</p>
              <input
                type="text"
                placeholder="Name..."
                className="input_of_txtAddproduct"
              />
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopup}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="">
              <h2>Add Product name</h2>
              <input
                type="text"
                placeholder="Name..."
                className="text-input-name"
              />
              <div className="btn-popup">
                <button onClick={togglePopup} className="btn-cancel">
                  Cancel
                </button>
                <button className="btn-ok">OK</button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {isOpen2 && (
        <div className="background_addproductpopup_box2">
          <div className="hover_addproductpopup_box2">
            <div className="box_input2">
              <p>Add product price</p>
              <input
                type="text"
                placeholder="Price..."
                className="input_of_txtAddproduct"
              />
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopup2}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Popup detail food */}
      {/* {isPopupfood && (
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
      )} */}
    </>
  );
}

export default Itemfood;
