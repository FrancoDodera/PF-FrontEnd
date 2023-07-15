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
<div className={style.Userpassword}> 
           <h2 className={style.passwordselect}>
           {showChangePassword ? (
            <>
              <button className={style.cancelbutton} onClick={toggleChangePassword}>
                Cancel
              </button>
              <button className={style.submitbutton} onClick={handleSubmit}>
                Save Changes
              </button>
            </>
            ) : (
            <button className={style.databutton} onClick={toggleChangePassword}>
              Change user data
            </button>
            )}
            </h2>
      </div>
      
)
          }
          

export default ChangePass;