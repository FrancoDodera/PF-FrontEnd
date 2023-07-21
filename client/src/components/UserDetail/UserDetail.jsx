import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./UserDetail.css";
import user from "../../img/userimg.webp";
import NavBar from "../navbar/NavBar";
import Swal from "sweetalert2";
import style from "../UserDetail/UserDetail.module.css";
import AccountInfo from "../UserDetail/AccountInfo";
import ChangePass from "../UserDetail/ChangePass";
import Purchases from "../UserDetail/Purchases";
import ContactUs from "../UserDetail/ContactUs";

const UserDetail = () => {
  const [section, setSection] = useState("AccountInfo");

  const handlerSection = (e) => {
    const name = e.target.name;
    console.log(name);
    setSection(name);
  };

  return (
    <div>
      <NavBar />
      <div className={style.UserDetailC}>
        <div className={style.barra}>
          <ul>
            <li className={style.libarra}>
              <button name="AccountInfo" onClick={handlerSection}>
                Account information
              </button>
            </li>
            <li className={style.libarra}>
              <button name="ChangePass" onClick={handlerSection}>
                Change Password
              </button>
            </li>
            <li className={style.libarra}>
              <button name="Purchases" onClick={handlerSection}>
                My purchases
              </button>
            </li>
          </ul>
          {/* <div className={style.contact}>Contact Us</div> */}
          <ContactUs/>
        </div>
        <div>
          {section == "AccountInfo" && <AccountInfo />}
          {section == "ChangePass" && <ChangePass />}
          {section == "Purchases" && <Purchases />}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
