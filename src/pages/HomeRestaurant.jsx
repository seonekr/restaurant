import React, { useState } from "react";
import "./css/homeRestaurant.css";
import restaurant from "../img/restaurant.jpg";
import { Link } from "react-router-dom";
import Search from "../components/Search";

function HomeRestaurant() {
  return (
    <>
      <Search />
      <div className="container_restaurant">
        <div className="head_restaurant">
          <div className="filter_restaurant">
            <div></div>
            <h3>Restaurant</h3>
          </div>
        </div>
        <div className="box_itemFood_restaurant">
          <div className="box_containner_restaurant">
            <Link to="#" className="box_containner_itemFood">
              <div className="box_containner_image">
                <img src={restaurant} alt="image" />

                <div className="txt_boxDescription">
                  <div className="product-info-txt">
                    <p className="product-name-txt">Name:</p>
                  </div>
                  <div className="product-info-txt">
                    <p className="product-price-txt">Descritions: </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="box_containner_restaurant">
            <Link to="#" className="box_containner_itemFood">
              <div className="box_containner_image">
                <img src={restaurant} alt="image" />

                <div className="txt_boxDescription">
                  <div className="product-info-txt">
                    <p className="product-name-txt">Name:</p>
                  </div>
                  <div className="product-info-txt">
                    <p className="product-price-txt">Descritions: </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRestaurant;
