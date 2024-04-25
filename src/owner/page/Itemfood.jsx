import React, { useState } from "react";
import "./css/itemfood.css";
import foodImage from "../../img/foodImage.png";
import { Link } from "react-router-dom";
import imageicon from "../../img/imageicon.jpg";
import { IoCartOutline } from "react-icons/io5";
import iconshoppin1 from "../../img/iconshoppin1.png";
import { FaPencil } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Alert2 from "../../img/alert2.png";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
//
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
function Itemfood() {
 
  const [loading] = React.useState(false);
  const [success] = React.useState(false);
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
//  const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
    
//   };
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
  //
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // Alert Name restaurant
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
// Name
  const handleConfirmClickName = () => {
    const { input1 } = inputValues;
    if (!input1.trim() ) {
      setDialogContent("Please enter name.");
      setOpenDialog(true); // Display dialog only when there are validation errors
    } else {
      
      setInputValues({
        ...inputValues,
        input1: "",
      });
      togglePopup();
    }
};
// Price
const handleConfirmClickPrice = () => {
  const { input2 } = inputValues;
  if (!input2.trim() ) {
    setDialogContent("Please enter price.");
    setOpenDialog(true); // Display dialog only when there are validation errors
  } else {
    
    setInputValues({
      ...inputValues,
      input2: "",
    });
    togglePopup2();
  }
};
// Image food
const handleConfirmClickImage = () => {
  const { input3 } = inputValues;
  if (!input3.trim() ) {
    setDialogContent("Please choose an image.");
    setOpenDialog(true);
  }
  else{
    setInputValues({
      ...inputValues,
      input3: "",
    });
    togglePopupimage();
  }
};
  return (
    <>
      <div className="food_container_box-main">
        <div className="poster_food-mainpage">
          <div className="filter2">
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

        <div className="box_itemFood_container_main">
          {products.map((product, id) => (
            <Link to="#" className="box_itemFood-main" key={id}>
              <div className="box_itemFood_item_main">
                <img src={product.image} alt="" onClick={toggleisPopupfood} />
                <div
                  className="deleteBox_productcontent"
                  // onClick={() => handleDelete(id)}
                  onClick={() => handleDelete(product.id)}
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
               name="input3"
               accept="image/*" // Specify accepted file types, e.g., images
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
           <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickImage}>
             OK
           </button>
         </div>
         <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
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
                name="input1"
                value={inputValues.input1}
                onChange={handleInputChange}
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
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickName}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
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
               name="input2"
               value={inputValues.input2}
               onChange={handleInputChange}
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
              <button className="btn_confirm btn_addproducttxt_popup" onClick={handleConfirmClickPrice}>
                OK
              </button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{dialogContent}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>OK</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
      {/* Delete */}
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
              <p>You want to delete item</p>
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
