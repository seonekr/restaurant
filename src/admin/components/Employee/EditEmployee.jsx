import "./editEmplotee.css";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoKeySharp } from "react-icons/io5";
import AdminMenu from "../ownerMenu/OwnerMenu";

const EditEmployee = () => {
  return (
    <>
    <AdminMenu/>
      <section id="addAmins">
        <div className="box_addAdmin">
          <form>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Edit Employee</h2>
                <div>
                  <button type="submit" className="btn_submit">
                    Update
                  </button>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">
                  Name:
                </label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="fname"
                    id="fname"
                    className="input"
                    placeholder="Name..."
                  />
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">
                  Email:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email address..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                    type="password"
                    id="password"
                    className="input"
                    placeholder="Password..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                Confirm password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                    type="password2"
                    id="password2"
                    className="input"
                    placeholder="Confirm password..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">
                  Profile image:
                </label>
                <div className="boxiconnandinput">
                  <CiImageOn className="iconinput" />
                  <input type="file" className="input" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditEmployee;
