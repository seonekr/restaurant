import React from "react";
import "./css/signup2.css";
import { Link, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Menufooter from "../../components/Menufooter";

const Signup2 = () => {
  const locataion = useLocation();
  const user_tyep = locataion.state;
  return (
    <>
      <Menufooter />
      <div className="box_forgot">
    
        {user_tyep == "1" ? (
          <h2>User registration</h2>
        ) : (
          <h2>Seller registration</h2>
        )}

        <div className="title">
          You are in the process of signing up as a user!
        </div>
        <form className="container_form_user">
          <div className="box_title_restaurant">Enter basic information</div>
          <div className="container_form_user2">
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
            />
            <div id="email_send_btn"></div>
            <div className="verification">Verify</div>
          </div>
          <input
            type="code"
            name="code"
            placeholder="Certication Number"
            required
          />
          {user_tyep == "1" && (
            <input
              type="nickname"
              name="nickname"
              placeholder="Nickname (maximun 10 characters)"
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="passwords"
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            required
          />
          {user_tyep == "2" && (
            <>
              <div className="box_title2">Enter store information</div>
              <input
                type="category"
                name="category"
                placeholder="category"
                required
                hidden
              />
              <input
                type="name"
                name="name"
                placeholder="Store name (required)"
                required
              />
              <input
                type="address"
                name="address"
                placeholder="Address (required) "
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Phone number (optional)"
              />
              <input
                type="company_number"
                name="company_number"
                placeholder="Business registration number (optional)"
              />

              <textarea
                className="box_text"
                name="introduce"
                placeholder="Store introduction (optional/maximum 300 characters)"
                maxLength="300"
              ></textarea>
            </>
          )}
          <button type="button">Register</button>
        </form>
      </div>
    </>
  );
};

export default Signup2;
