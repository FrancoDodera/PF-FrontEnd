import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import user from "../../img/userimg.webp";
import NavBar from "../navbar/NavBar";
import Swal from "sweetalert2";
import style from "../UserDetail/UserDetail.module.css";

const ChangePass = () =>{
   const [dataPassword,setDataPassword] = useState({password:"",confirmPassword:""});
    const [showChangePassword, setShowChangePassword] = useState(false);
const [dataUser, setDataUser] = useState({});

    const toggleChangePassword = () => {
      setShowChangePassword(!showChangePassword);
    };
    const handlePwdChange = (e) => {
     
      const {name} = e.target;
      const {value} = e.target;
      setDataPassword({...dataPassword,[name]:value});
    }


    const handleSubmit = async () => {
      if (dataPassword.password==dataPassword.confirmPassword){
        const postData = 
          {
            id: dataUser._id,
            name: "",
            lastName:"",
            email: "",
            user: "",
            password: dataPassword.password,
            type: "",
            image: "",
          }
        ;
        console.log(postData);
        try {
          const { data } = await axios.put(
            "https://pf-back.fly.dev/user/upgrade",
            postData
          );
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Updated User",
              position: "top-end",
              showConfirmButton: false,
              timer: 500,
            });
          } else {
            alert("Error changing account data");
          }
        } catch (error) {
          alert(error);
        }
      }
      else{
        Swal.fire({
          icon: "error",
          title: "password does not match",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
     
    };

    

    useEffect(() => {
      const user = localStorage.getItem("user");
      const admin = localStorage.getItem("admin");
      let postData = {};
      if (user) {
        postData = {
          user: user,
        };
      } else if (admin) {
        postData = {
          user: admin,
        };
      }
  
      if (user || admin) {
        axios
          .post("https://pf-back.fly.dev/user/verifyUser", postData)
          .then((response) => {
            if (response.status === 202 && response.data) {
              setDataUser(response.data.data);

            } else {
              console.error("Error getting user account details");
            }
          })
          .catch((error) => {
            console.error("Error making the request:", error);
          });
      } else {
        console.error("No user found in localStorage");
      }
    }, []);

return(
 <div className={style.Userpassword}>
  <h1>Change your Password here</h1>
             <h2 className={style.passwordselect}>
              {showChangePassword ? (
            <>
            <input type="password" placeholder="New Password" value={dataPassword.password} name="password" className={style.campo} onChange={handlePwdChange}/>
              <input type="password" placeholder="Confirm Password" value={dataPassword.confirmPassword} name="confirmPassword" className={style.campo} onChange={handlePwdChange}/>
              <button className={style.cancelbutton} onClick={toggleChangePassword}>
                Cancel
              </button>
              <button className={style.submitbutton} onClick={handleSubmit}>
                Save Changes
              </button>
            </>
          ) : (
            <button className={style.databutton} onClick={toggleChangePassword}>
              Change Password
            </button>
          )}
           </h2>
           </div>
)
          }
          

export default ChangePass;