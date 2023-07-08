import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDetail.css";

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changeImageError, setChangeImageError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeImg, setShowChangeImg] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const postData = {
        email: email,
      };
      axios
        .post("https://pf-back.fly.dev/user/verifyUser", postData)
        .then((response) => {
          if (response.data.success) {
            setUserDetails(response.data);
          } else {
            console.error("Error getting user account details");
          }
        })
        .catch((error) => {
          console.error("Error making the request:", error);
        });
    } else {
      console.error("No email found in localStorage");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const toggleChangePassword = (e) => {
    e.preventDefault();
    setShowChangePassword(!showChangePassword);
  };

  const toggleChangeImg = (e) => {
    e.preventDefault();
    setShowChangeImg(!showChangeImg);
  };

  const handleChangePassword = () => {
    setChangePasswordError("");

    if (newPassword !== confirmPassword) {
      setChangePasswordError("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("email");
    const postData = {
      email: email,
      newPassword: newPassword,
    };

    axios
      .post("https://pf-back.fly.dev/user/changePassword", postData)
      .then((response) => {
        if (response.data.success) {
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setChangePasswordError("Error changing password");
        }
      })
      .catch((error) => {
        console.error("Error making the request:", error);
        setChangePasswordError("Error changing password");
      });
  };

  const handleImageUpload = () => {
    setChangeImageError("");

    if (!profileImage) {
      setChangeImageError("Please select an image");
      return;
    }

    const email = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("profileImage", profileImage);

    axios
      .post("https://pf-back.fly.dev/user/changeProfileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          setProfileImage(null);
        } else {
          setChangeImageError("Error changing profile image");
        }
      })
      .catch((error) => {
        console.error("Error making the request:", error);
        setChangeImageError("Error changing profile image");
      });
  };

  return (
    <div className="user-detail-container">
      {userDetails ? (
        <div>
          <p className="user-detail-item"> Name: {userDetails.name}</p>
          <p className="user-detail-item"> Lastname: {userDetails.lastName}</p>
          <p className="user-detail-item"> Email: {userDetails.email}</p>
          <p className="user-detail-item"> DNI: {userDetails.dni}</p>
        </div>
      ) : (
        <p>Loading user account details...</p>
      )}
      <div className="change-password">
        <h2 className="section-heading">
          <a href="#" onClick={toggleChangePassword}>
            Change Password
          </a>
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
            <button onClick={handleChangePassword}>Submit</button>
            {changePasswordError && (
              <p className="error-message">{changePasswordError}</p>
            )}
          </div>
        )}
      </div>
      <div className="change-img">
        <h2 className="section-heading">
          <a href="#" onClick={toggleChangeImg}>
            Change profile picture
          </a>
        </h2>
        {showChangeImg && (
          <div className="input-group">
            <input type="file" onChange={handleImageChange} />
            <button className="action-button" onClick={handleImageUpload}>
              Upload
            </button>
          </div>
        )}
        {changeImageError && (
          <p className="error-message">{changeImageError}</p>
        )}
      </div>
      <Link to="/home" className="home-button">
        Volver al Home
      </Link>
    </div>
  );
};

export default UserDetail;
