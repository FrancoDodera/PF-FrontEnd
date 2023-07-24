import React from "react";
import styles from "./NewsCard.module.css";

const Card = ({ title, content, imageURL }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.text}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <img src={imageURL} alt={title} />
      </div>
    </div>
  );
};

export default Card;
