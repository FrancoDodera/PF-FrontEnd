import NavBar from "../navbar/NavBar";
import React from "react";
import styles from "./failureMP.module.css";


const FailurePage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.contenedormp}>
        <h1 className={styles.h1mp}>Your purchase has not been processed correctly</h1>
        <p className={styles.parrafoMP}>Error 404</p>
      </div>
    </div>
  );
};

export default FailurePage;
