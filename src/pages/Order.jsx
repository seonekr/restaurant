import React from 'react'
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import { Link } from 'react-router-dom';
import { GrDocumentText } from "react-icons/gr";
import { LuChefHat } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
   
function Order() {
    return (
        <div className='order_box_container'>
            <div className='order_box_container'>
                <div className="title_header_orderBox">
                    <Link to="/orderList" className='back_orderBox'>
                        <IoIosArrowBack className='icon_closeReviwe' />
                        Back
                    </Link>
                    <h3>Order</h3>
                </div>
                <div className="box_firstOrder_content">
                    <h4>Track your Order</h4>
                    <div className="boxOrder_status">
                        <div className="numberIdFoodorder">
                            <p>No:1</p>
                            <p>ID:1</p>
                            <p>Name:1</p>
                        </div>
                        <div className="boxstatus_foodorder">
                            <div className='icon_status ofitxtactive '>
                                <GrDocumentText />
                            </div>
                            <div className='icon_status ofitxtactive'>
                                <LuChefHat />
                            </div>
                            <div className='icon_status '>
                                <BiSolidDish />
                            </div>
                            <div className="spanBoxInline"></div>
                            <div className="spanBoxInline2"></div>
                        </div>
                        <p className='ssdasdsa'>Your order has been received</p>
                    </div>
                </div>
                <div className="order_content">
                    <h4>List menu:</h4>
                    <div className="order_contentItem">
                        <div>
                            <h4>Name</h4>
                            <div className="boxGrouptxtintro boxofnamefood">
                                <p>Name...</p>
                                <p>Name...</p>
                                <p>Name...</p>
                            </div>
                        </div>
                        <div>
                            <h4>Price</h4>
                            <div className="boxGrouptxtintro">
                                <p>12,000</p>
                                <p>12,000</p>
                                <p>12,000</p>
                            </div>
                        </div>
                        <div>
                            <h4>Amount</h4>
                            <div className="boxGrouptxtintro">
                                <p>1</p>
                                <p>1</p>
                                <p>1</p>
                            </div>
                        </div>
                    </div>
                    <div className="box_groupPrice">
                        <h4>Total:</h4>
                        <h4>74,000</h4>
                    </div>
                    <div className="boxgroupLastfoot">
                        <p>Place on: 15/09/2023</p>
                        <p>Payment method: MasterCard</p>
                    </div>
                </div>
            </div>
            <Menufooter />
        </div>
    )
}

export default Order