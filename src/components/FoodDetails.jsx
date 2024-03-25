import React from 'react'
import "./css/foodItem.css";
import foodImage2 from "../img/foodImage2.jpg";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import { FaPlus, FaMinus } from "react-icons/fa6";

function FoodDetails() {
    return (
        <div className="foodDetails_container">
            <Link to="/" className='goBack_foodDetails'>
                <IoClose className='goBack_foodDetails_icon' />
            </Link>
            <div className="box_content_deatilsfood">
                <img src={foodImage2} alt="" />
            </div>

            <div className="details_food_box_item">
                <div className="box_gput_details">
                    <div className="nameOF_details">
                        <h3>Name</h3>
                        <p>100,000 Kip</p>
                    </div>
                    <p>description</p>
                </div>

                <div className="box_gput_details">
                    <div className="nameOF_details">
                        <h3>Selcte more</h3>
                    </div>
                    <p>description</p>
                </div>

                <form action="" className='form_cheackbox_morefood'>
                    <div className='boxCheck_item'>
                        <input type="checkbox" />
                        <label htmlFor="">something</label>
                    </div>
                    <div className='boxCheck_item'>
                        <input type="checkbox" />
                        <label htmlFor="">something</label>
                    </div>
                    <div className='boxCheck_item'>
                        <input type="checkbox" />
                        <label htmlFor="">something</label>
                    </div>
                </form>

                <div className="write_moreBox">
                    <h3>Special recommendations</h3>
                    <p>Please tell us if you have any food allergies</p>
                    <textarea className='boxWrite_more' rows="7" cols="65">The cat was playing in the garden.</textarea>
                </div>
            </div>

            <div className="footer_foodDetails_box">
                <div className="DetailsFood_item_box">
                    <div className="boxCount_numfood_foodDetails">
                        <p className='deleteIconCount'><FaMinus /></p>
                        <p className='countBtn_numberCount'>1</p>
                        <p className='addIconCount'><FaPlus /></p>
                    </div>
                    <Link to="#" className="box_btnCON_addCart">
                        Cart to cart
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails