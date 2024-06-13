import React, { useState, useEffect } from "react";
import "./css/foodItem.css";
import { Link, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";

function FoodItem() {
  const { restaurant_id, table_id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API
        }/restaurants/${restaurant_id}/menu_items/list/`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const getCategories = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API
        }/restaurants/${restaurant_id}/categories/list/`
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };
  const addToCart = (product) => {
    // Clone the current cart state
    const updatedCart = [...cart];

    // Check if the product already exists in the cart
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Product already exists in cart, show alert and do not add again
      alert("This product is already in your cart!");
    } else {
      // Product does not exist in cart, add it with quantity 1
      const updatedProduct = {
        ...product,
        quantity: 1,
        restaurant_id: restaurant_id,
        table_id: table_id,
      };
      updatedCart.push(updatedProduct);
      setCart(updatedCart);

      // Show alert that product was added to cart
      alert("Product added to cart!");
    }

    // Update local storage with updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  console.log("####*************######", typeof restaurant_id, table_id);

  return (
    <>
      <div className="container_boxcategory_hp">
        {categories.map((category) => (
          <div key={category.id}>
            <Link
              className={`link_categor_l ${
                category.id === categoryId ? "activeCategory" : ""
              }`}
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
            {/* Display restaurant name if available */}
            <h3>Restaurant's Food</h3>
          </div>
        </div>

        <div className="box_itemFood_container">
          {products.map((product) => (
            <div className="box_itemFood" key={product.id}>
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
              <div className="icon_addcartTo">
                <IoCartOutline
                  className="icon_addcartToIN"
                  onClick={() => addToCart(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FoodItem;
