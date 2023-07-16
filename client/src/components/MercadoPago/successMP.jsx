import NavBar from "../navbar/NavBar";
import React from "react";
import styles from "./successMP.module.css"

const SuccessPage = () => {
  return (
      <div>
        <NavBar />
      <div className={styles.contenedormp}>
        <h1>¡Successful purchase!</h1>
        <p>
          Thanks for your purchase. The payment has been completed successfully.
          You will soon receive a confirmation by email.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
