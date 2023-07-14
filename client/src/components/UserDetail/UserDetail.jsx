import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDetail.css";
import user from "../../img/userimg.webp";
import NavBar from "../navbar/NavBar";
import Swal from "sweetalert2";
const UserDetail = () => {
  const [userDetails, setUserDetails] = useState({});
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const cloudName = "dbt5vgimv";
  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    let postData={}
    if(user){
       postData = {
        user: user,
      };
    }else if(admin){
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
    } else{
      console.error("No user found in localStorage");
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
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
  const handleSubmit = async() => {
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
      password: newPassword || userDetails.password,
      image: imageUrl,
      type:""
    };
    try {
      const {data}=await axios.put("https://pf-back.fly.dev/user/upgrade",postData);
        if (data) {
          setUserDetails(data);
          setName(data.name);
          setLastname(data.lastName);
          setEmail(data.email);
          setNewPassword("");
          setConfirmPassword("");
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
      alert(error)
    }
    
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    setProfileImage(files);
  };

  return (
    <div>
      <NavBar />
    <div className="user-detail-container">
      <div className="user-detail">
         {/* <img className="userMenuImg" src={profileImage || user} alt="" />  */}
        <p className="user-detail-item">
          Name:{" "}
          {showChangePassword ? (
            <input type="text" value={name} className="campo" onChange={handleNameChange} />
          ) : (
            userDetails.name
          )}
        </p>
        <p className="user-detail-item">
          Lastname:{" "}
          {showChangePassword ? (
            <input type="text" value={lastname} className="campo" onChange={handleLastnameChange} />
          ) : (
            userDetails.lastName
          )}
        </p>
        <p className="user-detail-item">
          Email:{" "}
          {showChangePassword ? (
            <input type="text" value={email} className="campo" onChange={handleEmailChange} />
          ) : (
            userDetails.email
          )}
        </p>
      </div>
      <div className="change-password">
        <h2 className="section-heading">
          {showChangePassword ? (
            <>
              <button className="cancel-button" onClick={toggleChangePassword}>
                Cancel
              </button>
              <button className="submit-button" onClick={handleSubmit}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="change-password-button" onClick={toggleChangePassword}>
              Change user data
            </button>
          )}
        </h2>
        {showChangePassword && (
          <div className="input-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="submit-button" onClick={handleSubmit}>
              Change Password
            </button>
            {changePasswordError && (
              <p className="error-message">{changePasswordError}</p>
            )}
          </div>
        )}
      </div>
      <div className="change-img">
        <h2 className="section-heading">
          {showChangePassword ? "Change Profile Picture" : ""}
        </h2>
        {showChangePassword && (
          <div className="input-group">
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
      </div>
      {isDataUpdated && (
        <div className="feedback-message"> Data updated successfully! </div>
      )}
      <Link to="/home" className="home-button">
        Back Home
      </Link>
    </div>
    </div>
  );
};

export default UserDetail;