import React, { useEffect, useState } from "react";
import Card from "./NewsCard";
import styles from "./NewsPage.module.css";
import NavBar from "../navbar/NavBar";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = "84432522b9bf4608bfb735a7732a2ae3";
    const keywords = ["cars", "vehicles", "automotives"];
    const keywordString = keywords.join(" ");

    const url = `https://newsapi.org/v2/everything?q=${keywordString}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setNews(response.data.articles);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error making the request:", error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className={styles.title}> Automotive News </h1>
      <div className={styles.card}>
        {news.map((noticia, index) => (
          <Card
            key={index}
            title={noticia.title}
            content={noticia.description}
            imageURL={noticia.urlToImage}
            author={noticia.author}
            publishedAt={noticia.publishedAt}
            onError='https://res.cloudinary.com/dbt5vgimv/image/upload/v1690235177/CarGo/default_image_xtlbej.png'
          />
        ))}
      </div>
    </div>
  );
};

export default News;
