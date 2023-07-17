import NavBar from "../navbar/NavBar";
import React from "react";
import styles from "./pendingMP.module.css";


const PendingPage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.contenedormp}>
        <h1 className={styles.h1mp}> Processing the payment... </h1>
      </div>
    </div>
  );
};

export default PendingPage;

