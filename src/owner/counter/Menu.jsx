import React, { useEffect, useState, useContext } from "react";
import Menufooter from "../page/Menubar";
import "./css/menu.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import Ordermenu from "./Ordermenu";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

const Menu = () => {
  const { tableId } = useParams();
  const [table, setTable] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/restaurant/tables/${tableId}`)
      .then((response) => {
        console.log("Table info response:", response.data);
        setTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching table information:", error);
      });

    axios
      .get(
        `http://127.0.0.1:8000/restaurant/orders/?table_id=${tableId}&restaurant_id=1`
      )
      .then((response) => {
        const ordersForTable = response.data.filter(
          (order) => order.table === parseInt(tableId)
        );
        setOrders(ordersForTable);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    axios
      .get(`http://127.0.0.1:8000/restaurant/menu-items/`)
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });

    getProducts();
    getCategories();
  }, [tableId]);

  const getProducts = () => {
    axios
      .get(import.meta.env.VITE_API + "/restaurant/menu-items/?restaurant_id=1")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const getCategories = () => {
    axios
      .get("http://127.0.0.1:8000/restaurant/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  console.log("status table", tableId);
  const filteredProducts = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  const addToCart = (product) => {
    const newOrderItem = {
      id: Date.now(), // Unique ID
      menu_item: product.id,
      quantity: 1,
    };

    const updatedOrders = orders.map((order) => {
      if (order.table === parseInt(tableId)) {
        return { ...order, order_items: [...order.order_items, newOrderItem] };
      }
      return order;
    });

    setOrders(updatedOrders);

    // Using SweetAlert2 for confirmation
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart!",
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500, // Automatically close after 1.5 seconds
    });
  };

  return (
    <>
      <Menufooter />
      <div className="container-menu">
        <div className="contain-menu">
          <div className="title_header_order">
            <Link to="/counter" className="back_orderBox">
              <IoIosArrowBack className="icon_closeReviwe" />
              Back
            </Link>
          </div>
          <h2>Menu Table {tableId}</h2>

          <div className="category-selector">
            {categories.map((category, index) => (
              <div key={index}>
                <Link
                  className="link_categor activeCategory"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="box_itemFood_container22">
            {filteredProducts.map((product) => (
              <Link to="#" className="box_itemFood" key={product.id}>
                <div className="box_itemFood_item22">
                  <img src={product.image} alt="" />
                  <div className="txt_boxDescription">
                    <div className="product-info-hp">
                      <p className="product-name-hp">{product.name}</p>
                    </div>
                    <div className="product-info-hp">
                      <p className="product-price-hp">
                        Price: ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="icon_addcartTo">
                  <IoCartOutline
                    className="icon_addcartToIN"
                    onClick={() => addToCart(product)}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="contain-order">
          <Ordermenu
            orders={orders}
            setOrders={setOrders}
            menuItems={menuItems}
            tableId={tableId}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;