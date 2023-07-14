import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import user from "../../img/userimg.webp";
import NavBar from "../navbar/NavBar";
import Swal from "sweetalert2";
import style from "../UserDetail/UserDetail.module.css";

const ChangePass = () =>{
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
return(
<div>
     {showChangePassword && (
        <div className={style.inputgroup}>
          <label className={style.newpass}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className={style.confirmpass}>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className={style.changepass} onClick={handleSubmit}>
            Change Password
          </button>
          {changePasswordError && (
            <p className="error-message">{changePasswordError}</p>
          )}
        </div>
      )}
      </div>
)
          }
          

export default ChangePass;