import "./css/mainpage.css";
import React from "react";
import Menubar from "./Menubar";
import Itemfood from "./Itemfood";
import logo2 from "../../img/logo2.png";
import banner from "../../img/banner.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoCameraReverse } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";




const Mainpage = () => {
  
    //  //PopUp box Delete
    //  const [isPopupDelete, setPopupDelete] = useState(false);

    //  const handleDelete = () => {
    //      setPopupDelete(!isPopupDelete);
    //  };
 
    //  //PopUp box add image
    //  const [isPopupimage, setPopupimage] = useState(false);
 
    //  const togglePopupimage = () => {
    //      setPopupimage(!isPopupimage);
    //  };
 
    //  //PopUp box add name
    //  const [isPopupname, setPopupname] = useState(false);
 
    //  const togglePopupname = () => {
    //      setPopupname(!isPopupname);
    //  };
 
    //  //PopUp box add price
    //  const [isPopupprice, setPopupprice] = useState(false);
 
    //  const togglePopupprice = () => {
    //      setPopupprice(!isPopupprice);
    //  };
    //  //PopUp box add category
    //  const [isPopupcategory, setPopupcategory] = useState(false);
 
    //  const togglePopupcategory = () => {
    //      setPopupcategory(!isPopupcategory);
    //  };
    //  //PopUp box add description
    //  const [isPopupdescription, setPopupdescription] = useState(false);
 
    //  const togglePopupdescription = () => {
    //      setPopupdescription(!isPopupdescription);
    //  };
  return (
    <div className="container_boxhomepage">
      <div className="container_boxHeaderAt_store2">
        <div >
          <img src={logo2} className="logo_box_homepage"/>
          <div className="iconnChangeImage">
                    <IoCameraReverse />
                </div>
        </div>
        <div className="box_heardOfGrooup2">
          <div className="header_box_of_header-main">
            <div className="description_header-main">
              <h3>Name Restaurant
              <div>
              <div className="iconnChangeImageEditname">
              <FaPencil/>
                </div>
              </div>
            
              </h3>
              <p>Description restaurant</p>
            </div>
            <div className="contact_head_Boxdetails-tel">
              <div className="contact_head_Boxdetails">
                <FiPhone className="iconnDetails_head" />
                <p>+856 20 55 000 959</p>
              </div>
              <div className="contact_head_Boxdetails">
                <IoMdTime className="iconnDetails_head" />
                <p>8:00 - 20:00</p>
                <FaPencil className="iconEdit_store" />
              </div>
            </div>

            <div className="header_contact_details">
              <div className="contact_head_Boxdetails">
                <div className="all_star_box">
                  <IoIosStar className="iconstar_review adtiveStar" />
                  <IoIosStar className="iconstar_review adtiveStar" />
                  <IoIosStar className="iconstar_review adtiveStar" />
                  <IoIosStar className="iconstar_review" />
                  <IoIosStar className="iconstar_review" />
                </div>
                <p>29 Review</p>
              </div>
              <Link to="/reviews" className="switch_btn1">
                View
              </Link>
            </div>
          </div>
          <div className="header_contact_details_box">
            {/* <div className="qr_code_scanner_box">
              <IoQrCodeOutline className="iconn_qrcode" />
              <p>Scan RQ code</p>
            </div> */}
            <div className="header_contact_details">
              <div className="contact_head_Boxdetails3">
                <FiMapPin className="iconnDetails_head-map" />
                <p>131 Sapang  Sisangvone Road, 
                Ban Naxay, Vientiane 0100 ลาว</p>
                  
              </div>
              <FaPencil className="iconEdit_store2" />
              <Link to="/addressMap" className="switch_btn2">
                
                View
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content">
          <img src={banner} className="logo-banner" />     <div className="iconnImagebanner">
                    <IoCameraReverse />
                </div>
          <div className="container_boxcategory">
            <Link className="link_categor_l activeCategory" to="#">Pizza</Link>
            <Link className="link_categor_l" to="#">Pizza</Link>
            <Link className="link_categor_l" to="#">Pizza</Link>
            <Link className="link_categor_l" to="#">Pizza</Link>
            <Link className="link_categor_l" to="#">Pizza</Link>
            <Link className="link_categor_l" to="#">Pizza</Link>
          </div>
        </div>
      </div>

      <Itemfood />
      <Menubar />
    </div>
  );
};

export default Mainpage;
