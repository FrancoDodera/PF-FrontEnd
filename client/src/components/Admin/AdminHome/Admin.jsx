import React from "react";
import style from "./admin.module.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className={style.adminContainer}>
      <button
        onClick={() => navigate("/home")}
        className={style.arrow}
      ></button>
      <button
        onClick={() => navigate("/admin/users")}
        className={style.buttons}
      ></button>
      <button
        onClick={() => navigate("/admin/posts")}
        className={style.buttons}
      ></button>
      <button
        onClick={() => navigate("/admin/graphs")}
        className={style.buttons}
      ></button>
    </div>
  );
};

export default Admin;
