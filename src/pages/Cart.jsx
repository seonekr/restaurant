import React from 'react'
import "./css/cart.css";
import { Link } from 'react-router-dom';
import foodImage from "../img/foodImage.png";
import { RiDeleteBinLine} from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Menufooter from "../components/Menufooter";


function Cart() {
    return (
        <>
            <div className='cart_box_container'>
                <div className="titleCart">
                    <h2>Cart</h2>
                </div>

                <div className="box_cart_item_head">
                    <h4>List menu:</h4>
                </div>
                <div className="box_groupaCart_item">
                    <div className="box_content_cart">
                        <div className="foodDetails_box">
                            <div className='box_ofDetails_food'>
                                <img src={foodImage} alt="" />
                                <div className="txt_ofDetails_food">
                                    <p>Name food</p>
                                    <p>Price</p>
                                </div>
                            </div>
                            <div className="right_oflastDetailsFood">
                                <RiDeleteBinLine className='icon_DetailsFood' />
                                <div className="boxCount_numfood">
                                    <p className='deleteIconCount'><FaMinus /></p>
                                    <p className='countBtn_numberCount'>1</p>
                                    <p className='addIconCount'><FaPlus /></p>
                                </div>
                            </div>
                        </div>
                        <div className="foodDetails_box">
                            <div className='box_ofDetails_food'>
                                <img src={foodImage} alt="" />
                                <div className="txt_ofDetails_food">
                                    <p>Name food</p>
                                    <p>Price</p>
                                </div>
                            </div>
                            <div className="right_oflastDetailsFood">
                                <RiDeleteBinLine className='icon_DetailsFood' />
                                <div className="boxCount_numfood">
                                    <p className='deleteIconCount'><FaMinus /></p>
                                    <p className='countBtn_numberCount'>1</p>
                                    <p className='addIconCount'><FaPlus /></p>
                                </div>
                            </div>
                        </div>
                        <div className="foodDetails_box">
                            <div className='box_ofDetails_food'>
                                <img src={foodImage} alt="" />
                                <div className="txt_ofDetails_food">
                                    <p>Name food</p>
                                    <p>Price</p>
                                </div>
                            </div>
                            <div className="right_oflastDetailsFood">
                                <RiDeleteBinLine className='icon_DetailsFood' />
                                <div className="boxCount_numfood">
                                    <p className='deleteIconCount'><FaMinus /></p>
                                    <p className='countBtn_numberCount'>1</p>
                                    <p className='addIconCount'><FaPlus /></p>
                                </div>
                            </div>
                        </div>
                        <div className="foodDetails_box">
                            <div className='box_ofDetails_food'>
                                <img src={foodImage} alt="" />
                                <div className="txt_ofDetails_food">
                                    <p>Name food</p>
                                    <p>Price</p>
                                </div>
                            </div>
                            <div className="right_oflastDetailsFood">
                                <RiDeleteBinLine className='icon_DetailsFood' />
                                <div className="boxCount_numfood">
                                    <p className='deleteIconCount'><FaMinus /></p>
                                    <p className='countBtn_numberCount'>1</p>
                                    <p className='addIconCount'><FaPlus /></p>
                                </div>
                            </div>
                        </div>
                        <div className="foodDetails_box">
                            <div className='box_ofDetails_food'>
                                <img src={foodImage} alt="" />
                                <div className="txt_ofDetails_food">
                                    <p>Name food</p>
                                    <p>Price</p>
                                </div>
                            </div>
                            <div className="right_oflastDetailsFood">
                                <RiDeleteBinLine className='icon_DetailsFood' />
                                <div className="boxCount_numfood">
                                    <p className='deleteIconCount'><FaMinus /></p>
                                    <p className='countBtn_numberCount'>1</p>
                                    <p className='addIconCount'><FaPlus /></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="count_footmenu_box">
                        <h3>Cart Total</h3>
                        <div className="count_footmenu_box_content">
                            <div className="count_footmenu_box_item">
                                <p>Quantity:</p>
                                <p>2</p>
                            </div>
                            <div className="count_footmenu_box_item">
                                <p>Total:</p>
                                <p>2,00 Kip</p>
                            </div>
                            <Link to="#" className='btn_confirmCart'>
                                Confirm Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Menufooter />
        </>
    )
}

export default Cart