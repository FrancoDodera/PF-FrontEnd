import React, { useEffect, useState } from "react";
import Card from "./NewsCard";
import styles from "./NewsPage.module.css";
import NavBar from "../navbar/NavBar";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const apiKey = "84432522b9bf4608bfb735a7732a2ae3";
    const keywords = ["cars", "vehicles", "automotives"];
    const keywordString = keywords.join(" ");

    const url = `https://newsapi.org/v2/everything?q=${keywordString}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (isMounted) {
          setNews(
            response.data.articles.map((noticia) => ({
              ...noticia,
              imageLoaded: true,
            }))
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error making the request:", error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const noticiasConImagenesValidas = news.filter(
    (noticia) => noticia.urlToImage && noticia.imageLoaded
  );

  return (
    <div>
      <NavBar />
      <h1 className={styles.title}> Automotive News </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
           <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className={styles.card}>
          {noticiasConImagenesValidas.map((noticia, index) => (
            <a
              key={index}
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card
                title={noticia.title}
                content={noticia.description}
                imageURL={noticia.urlToImage}
                url={noticia.url}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;