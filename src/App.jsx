import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//------ Home Page ------//
import Home from "./pages/HomePage";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import FoodDetails from "./components/FoodDetails";
import OrderList from "./pages/OrderList";

//------ Seller Page ------//
import HomeSeller2 from "./seller/homeSeller copy";
import HomeSeller from "./seller/homeSeller";
import Addfood from "./seller/Addfood";
import Dashborard from "./seller/Dashborard";
import Review from './pages/Review';
import Login from "./seller/Login";

//------ Owner Page ------//
import LoginO from "./owner/page/LoginO";
import Mainpage from "./owner/page/Mainpage"; 


function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* --------- Home Page ---------- */}
          <Route path="/" exact Component={Home} />
          <Route path="/orderList" exact Component={OrderList} />
          <Route path="/order" exact Component={Order} />
          <Route path="/cart" exact Component={Cart} />
          <Route path="/foodDetails" exact Component={FoodDetails} />
          <Route path="/reviews" exact Component={Review} />

          {/* --------- Seller Page ---------- */}
          <Route path="/homeSeller2" exact Component={HomeSeller2} />
          <Route path="/homeSeller" exact Component={HomeSeller} />
          <Route path="/addfood" exact Component={Addfood} />
          <Route path="/dashborard" exact Component={Dashborard} />
          <Route path="/login" Component={Login} />

          {/* --------- Owner Page ---------- */}
          <Route path="/logino" exact Component={LoginO} />
          <Route path="/mainpage" exact Component={Mainpage}/>

        </Routes>
      </Router>
    </>
  );
}
export default App;