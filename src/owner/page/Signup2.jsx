import { useState, useEffect } from "react";
import "./css/signup2.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Menufooter from "../../components/Menufooter";
import axios from "axios";
import Swal from "sweetalert2";

const Signup2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const userType = location.state;

  const [timer, setTimer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const [data, setData] = useState({
    category: "",
    email: "",
    code: "",
    nickname: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    address: "",
    restaurant_number: "",
    introduce: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const SignUp = () => {
    if (!data.email) {
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter your email!",
      });
      return;
    }

    if (!data.code) {
      Swal.fire({
        icon: "error",
        title: "Verification Code Required",
        text: "Please enter the verification code!",
      });
      return;
    }

    if (userType === "1" && !data.nickname) {
      Swal.fire({
        icon: "error",
        title: "Nickname Required",
        text: "Please enter your nickname!",
      });
      return;
    }

    if (!data.password) {
      Swal.fire({
        icon: "error",
        title: "Password Required",
        text: "Please enter your password!",
      });
      return;
    }

    if (data.password !== data.password2) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }

    if (userType === "2") {
      if (!data.name) {
        Swal.fire({
          icon: "error",
          title: "Restaurant Name Required",
          text: "Please enter the restaurant name!",
        });
        return;
      }
      if (!data.address) {
        Swal.fire({
          icon: "error",
          title: "Address Required",
          text: "Please enter the address!",
        });
        return;
      }
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have successfully registered!",
        }).then(() => {
          navigate("/logino");
        });
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          setErrorText(err.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: err.response.data.message,
          });
        } else {
          setErrorText("This is an unknown error.");
          Swal.fire({
            icon: "error",
            title: "Unknown Error",
            text: "This is an unknown error.",
          });
        }
      });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        setTimer({
          ...timer,
          second: second - 1,
        });
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(countdown);
        } else {
          setTimer({
            minute: minute - 1,
            second: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const sendVerificationEmail = () => {
    if (data.email.length > 0) {
      setTimer({ minute: 3, second: 0 });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API + "/user/send-email",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email: data.email },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          Swal.fire({
            icon: "success",
            title: "Verification Email Sent",
            text: "Please check your email for the verification code.",
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send verification email.",
          });
        });
    } else {
      setErrorText("Please enter your e-mail.");
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter your e-mail.",
      });
    }
  };

  return (
    <>
      <Menufooter />
      <div className="box_forgot">
        {userType === "1" ? (
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
              onChange={onChange}
              value={data.email}
              placeholder="Email"
              required
            />
            {minute > 0 || second > 0 ? (
              <div id="email_send_btn" className="verification">
                {minute < 10 ? `0${minute}` : minute}:
                {second < 10 ? `0${second}` : second}
              </div>
            ) : (
              <div
                onClick={sendVerificationEmail}
                id="email_send_btn"
                className="verification"
              >
                Verify
              </div>
            )}
          </div>
          <input
            name="code"
            onChange={onChange}
            value={data.code}
            placeholder="Certification Number"
            required
          />
          {userType === "1" && (
            <input
              name="nickname"
              onChange={onChange}
              value={data.nickname}
              placeholder="Nickname (maximum 10 characters)"
              required
            />
          )}

          <input
            type="password"
            name="password"
            onChange={onChange}
            value={data.password}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="password2"
            onChange={onChange}
            value={data.password2}
            placeholder="Confirm Password"
            required
          />
          {userType === "2" && (
            <>
              <div className="box_title_restaurant2">
                Enter store information
              </div>
              <input
                type="hidden"
                name="category"
                value={(data.category = "2")}
                onChange={onChange}
              />
              <input
                name="name"
                placeholder="Restaurant name (required)"
                value={data.name}
                onChange={onChange}
                required
              />
              <input
                name="address"
                placeholder="Address (required) "
                value={data.address}
                onChange={onChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone number (optional)"
                value={data.phone}
                onChange={onChange}
              />
              <input
                name="restaurant_number"
                placeholder="Restaurant registration number (optional)"
                value={data.restaurant_number}
                onChange={onChange}
              />

              <textarea
                className="box_text"
                name="introduce"
                placeholder="Restaurant introduction (optional/maximum 300 characters)"
                maxLength="300"
                value={data.introduce}
                onChange={onChange}
              ></textarea>
            </>
          )}
          <button type="button" onClick={SignUp}>
            Register
          </button>
        </form>
        {errorText.length > 0 && <div>{errorText}</div>}
      </div>
    </>
  );
};

export default Signup2;
