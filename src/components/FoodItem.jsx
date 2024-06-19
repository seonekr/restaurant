import React, { useState, useEffect } from "react";
import "./css/foodItem.css";
import { Link, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";

function FoodItem() {
  const { restaurantId, table_id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const storage = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API}/restaurants/${restaurant_id}/menu_items/list/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const getCategories = () => {
    axios
      .get(`${import.meta.env.VITE_API}/restaurants/${restaurant_id}/categories/list/`)
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
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      setCart([...cart, updatedProduct]);
    }

    // Update local storage with updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };
  

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
