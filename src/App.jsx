import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";

// Import your pages/components here
import Home from "./pages/HomePage";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import FoodDetails from "./components/FoodDetails";
import OrderList from "./pages/OrderList";
import Review from "./pages/Review";
import Payment from "./pages/Payment";
import Address from "./pages/Address";


import HomeSeller2 from "./seller/homeSeller copy";
import HomeSeller from "./seller/homeSeller";
import Addfood from "./seller/Addfood";
import Dashborard from "./seller/Dashborard";
import Login from "./seller/Login";

import Signup from "./owner/page/Signup";
import LoginO from "./owner/page/LoginO";
import Mainpage from "./owner/page/Mainpage";
import Addproduct from "./owner/page/Addproduct";
import Manageorder from "./owner/page/Manageorder";
import Detailorder from "./owner/page/Detailorder";
import Dashborardpc from "./owner/page/Dashboardpc";
import History from "./owner/page/History";
import Orderhistory from "./owner/page/Orderhistory";

import Homepage2 from "./webs/Homepage2";
import Order2 from "./webs/Order2";
import Cart2 from "./webs/Cart2";
import FoodItem2 from "./webs/FoodItem2";
import OrderList2 from "./webs/OrderList2";
import Review2 from "./webs/Review2";
import Payment2 from "./webs/Payment2";
import Address2 from "./webs/Address2";

//Admin
import Dashboard from "./admin/Dashboard";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = false;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  function googleTranslateElementInit() {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr,de,ja,ko,lo",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  }

  function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll behavior
      });
    };

    // Function to handle scroll event and toggle visibility of the button
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        // Change this value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener to scroll event
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
      <div className="scroll-to-top">
        {isVisible && (
          <button onClick={scrollToTop}>
            <i>Click to top</i>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div>
        <div id="google_translate_element" className="fixedElement"></div>
      </div>
      <Router>
        <Routes>
          {/* --------- Home Page ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/foodDetails" element={<FoodDetails />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/address" element={<Address />} />

          {/* --------- Seller Page ---------- */}
          <Route path="/homeSeller2" element={<HomeSeller2 />} />
          <Route path="/homeSeller" element={<HomeSeller />} />
          <Route path="/addfood" element={<Addfood />} />
          <Route path="/dashborard" element={<Dashborard />} />
          <Route path="/login" element={<Login />} />

          {/* --------- Owner Page ---------- */}
          <Route path="/logino" element={<LoginO />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/manageorder" element={<Manageorder />} />
          <Route path="/detailorder" element={<Detailorder />} />
          <Route path="/dashboardpc" element={<Dashborardpc />} />
          <Route path="/history" element={<History />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          
          {/* --------- Web delivery ---------- */}
          <Route path="/homepage2" element={<Homepage2 />} />
          <Route path="/orderList2" element={<OrderList2 />} />
          <Route path="/order2" element={<Order2 />} />
          <Route path="/cart2" element={<Cart2 />} />
          <Route path="/foodItem2" element={<FoodItem2 />} />
          <Route path="/reviews2" element={<Review2 />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/address2" element={<Address2 />} />

          {/* --------- Web delivery ---------- */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ScrollToTopButton />
    </>
  );
}

export default App;
