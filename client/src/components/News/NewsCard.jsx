import React from "react";
import styles from "./NewsCard.module.css";
import { useState } from "react";

const Card = ({ title, content, imageURL, author,publishedAt }) => {
  const [imageVisible, setImageVisible] = useState(true);

  const handleImageLoad = () => {
    setImageVisible(true);
  };

  const handleImageError = () => {
    setImageVisible(false);
  };
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <section className={styles.containerSection}>
          <h2>{title}</h2>
          <p>{content}</p>
        </section>
        <footer className={styles.footerSection}>
          <p className={styles.autorP}>{publishedAt} - <strong>{author}</strong> </p>
        </footer>
      </div>
      <div className={styles.cardContainerImage}>
      {imageURL && (
        <img
          src={imageURL}
          alt={title}
          style={{ display: imageVisible ? 'block' : 'none' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {!imageURL && (
        <img
          src='https://res.cloudinary.com/dbt5vgimv/image/upload/v1690235177/CarGo/default_image_xtlbej.png'
          alt="Image Alt"
        />
      )}
      </div>
    </div>
  );
};

export default Card;
