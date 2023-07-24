import React from "react";
import styles from "./NewsCard.module.css";

const Card = ({ title, content, imageURL, url }) => {

    const handleImageError = (event) => {
      event.target.style.display = "none"; 
    };

  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.text}>
          <h2>{title}</h2>
          <p>{content}</p>
          <a href={url} target="_blank" rel="noopener noreferrer"> Reed more... </a>
        </div>
        <img src={imageURL} alt={title} onError={handleImageError} />
      </div>
    </div>
  );
};

export default Card;
