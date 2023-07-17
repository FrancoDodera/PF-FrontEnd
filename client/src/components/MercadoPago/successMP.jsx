import NavBar from "../navbar/NavBar";
import React from "react";
import styles from "./successMP.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const SuccessPage = () => {
  useEffect(() => {
    localStorage.removeItem("cartItems");
  }, []);
  return (
    <div>
      <NavBar />
      <div className={styles.contenedormp}>
        <h1 className={styles.h1mp}>¡Successful purchase!</h1>
        <p className={styles.parrafoMP}>
          Thanks for your purchase. The payment has been completed successfully.
          You will soon receive a confirmation by email.
        </p>
        <Link to={"/home"}>
          <button className={styles.button}>Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
