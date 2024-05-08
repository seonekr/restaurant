import React from "react";
import "./css/logino.css";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Menubar from "./Menubar";
import { FcGoogle } from "react-icons/fc";
import { MdArrowBack } from "react-icons/md";

const Login = () => {
  return (
    <>
      <div className="box_container_logino">
        <div className="container-box-logino">
          <div className="box-icon-close">
            <Link to="/">
              <IoClose className="icon_closeReviwe" />
            </Link>
          </div>
          <div className="contian-box-logino">
            <h3>Login</h3>
            <p>Please login to use the service!</p>
            <div className="input_boxForm-login">
              <label>Email</label>
              <input
                className="input_form"
                type="email"
                placeholder="Enter Your Email"
              />
              <label>Password</label>
              <input
                className="input_form"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>

            <div className="forgot_password2">
              Forgot your password? {"\n"}
              <Link to="#" className="findpassword2">
                Find password
              </Link>
            </div>

            <Link to="/mainpage" type="submit" className="login_btn2">
              Login
            </Link>
            <div className="dont_account">
              Do not have an account? {"\n"}
              <Link to="/signup" className="signup2">
                Sign up
              </Link>
            </div>

            <a href="https://myaccount.google.com/" className="login_google2">
              <FcGoogle className="iconnDetails_head" />
              Login with Google
            </a>
          </div>
        </div>
      </div>
      <Menubar />
    </>
  );
};

export default Login;

{
}
