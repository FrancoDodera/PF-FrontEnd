import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import user from "../../img/userimg.webp";
import NavBar from "../navbar/NavBar";
import Swal from "sweetalert2";
import style from "../UserDetail/UserDetail.module.css";

const AccountInfo = () =>{
    const [userDetails, setUserDetails] = useState({});
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const cloudName = "dbt5vgimv";
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files[0];
        setProfileImage(files);
      };
    const handleNameChange = (e) => {
        setName(e.target.value);
      };
    
      const handleLastnameChange = (e) => {
        setLastname(e.target.value);
      };

      const toggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

      const uploadImage = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "CarGo_Pf_henry");
        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: data,
            }
          );
          if (res.ok) {
            const file = await res.json();
            return file.secure_url;
          } else {
            return "";
          }
        } catch (error) {
          alert(error);
        }
      };

      const handleSubmit = async () => {
        let imageUrl = "";
        if (profileImage != "") {
          imageUrl = await uploadImage(profileImage);
        }
        const postData = {
          id: userDetails._id,
          email: email || userDetails.email,
          name: name || userDetails.name,
          lastName: lastname || userDetails.lastName,
          user: userDetails.user,
          password:"",
          image: imageUrl,
          type: "",
        };
        try {
          const { data } = await axios.put(
            "https://pf-back.fly.dev/user/upgrade",
            postData
          );
          if (data) {
            setUserDetails(data);
            setName(data.name);
            setLastname(data.lastName);
            setEmail(data.email);
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
                setUserDetails(response.data.data);
                setName(response.data.data.name);
                setLastname(response.data.data.lastName);
                setEmail(response.data.data.email);
                setProfileImage(response.data.data.user);
                setIsDataUpdated(true);
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
    <div className={style.UserDetail}>
        <p className={style.Username}>
          Name:{" "}
          {showChangePassword ? (
            <input type="text" value={name} className={style.campo} onChange={handleNameChange} />
          ) : (
            userDetails.name
          )}
        </p>
        <p className={style.Userlastname}>
          Lastname:{" "}
          {showChangePassword ? (
            <input type="text" value={lastname} className={style.campo}  onChange={handleLastnameChange} />
          ) : (
            userDetails.lastName
          )}
        </p>
        <p className={style.Usermail}>
          Email:{" "}
          {showChangePassword ? (
            <input type="text" value={email} className={style.campo}  onChange={handleEmailChange} />
          ) : (
            userDetails.email
          )}
        </p>
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
          <div className={style.img}>
          <h2 className={style.archivoselect}>
            {showChangePassword ? "Change Profile Picture" : ""}
          </h2>
          {showChangePassword && (
            <div className={style.input2}>
              <input type="file" onChange={handleImageChange} />
            </div>
          )}
          </div>
       </div>

)
}

export default AccountInfo;

