import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import style from "../UserDetail/UserDetail.module.css";

const ChangePass = () => {
  const [dataPassword, setDataPassword] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [dataUser, setDataUser] = useState({});

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };
  const handlePwdChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setDataPassword({ ...dataPassword, [name]: value });
  };

  const handleSubmit = async () => {
    if (dataPassword.password == dataPassword.confirmPassword) {
      const postData = {
        id: dataUser._id,
        newPassword: dataPassword.password,
        password: dataPassword.oldPassword,
      };
      try {
        const { data } = await axios.put("/user/changePassword", postData);
        if (data.message) {
          Swal.fire({
            icon: "error",
            title: data.message,
            position: "top-end",
            showConfirmButton: false,
            timer: 500,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Updated User",
            position: "top-end",
            showConfirmButton: false,
            timer: 500,
          });
        }
      } catch (error) {
        alert(error);
      }
    } else {
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

  return (
    <div className={style.Userpassword}>
      <h1 className={style.Changepassword}>Change your Password:</h1>

      {showChangePassword ? (
        <div className={style.containerPass}>
          <label className={style.labpass}>Old Password:</label>
          <input
            type="password"
            placeholder="Old Password"
            value={dataPassword.oldPassword}
            name="oldPassword"
            className={style.campo2}
            onChange={handlePwdChange}
          />
          <label className={style.labpass}>New Password:</label>
          <input
            type="password"
            placeholder="New Password"
            value={dataPassword.password}
            name="password"
            className={style.campo2}
            onChange={handlePwdChange}
          />
          <label className={style.labpass}>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={dataPassword.confirmPassword}
            name="confirmPassword"
            className={style.campo2}
            onChange={handlePwdChange}
          />
          <div className={style.buttonspass}>
            <button
              className={style.cancelbutton}
              onClick={toggleChangePassword}
            >
              Cancel
            </button>
            <button className={style.submitbutton} onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <button className={style.databutton} onClick={toggleChangePassword}>
          Change Password
        </button>
      )}
    </div>
  );
};

export default ChangePass;
