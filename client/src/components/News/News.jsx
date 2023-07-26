import React, { useEffect, useState } from "react";
import Card from "./NewsCard";
import styles from "./NewsPage.module.css";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import Footer from "../Footer/Footer";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const apiKey = "84432522b9bf4608bfb735a7732a2ae3";
    const keywords = ["cars", "vehicles", "car reviews"];
    const keywordString = keywords.join(" ");
    const url = `https://newsapi.org/v2/everything?q=${keywordString}&apiKey=${apiKey}&pageSize=${pageSize}&page=${currentPage}`;

    axios
      .get(url)
      .then((response) => {
        setNews(
          response.data.articles.map((noticia) => ({
            ...noticia,
            imageLoaded: true,
          }))
        );
        setTotalPages(Math.ceil(response.data.totalResults / pageSize));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error making the request:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const noticiasConImagenesValidas = news.filter(
    (noticia) => noticia.urlToImage && noticia.imageLoaded
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <NavBar />
      <h1 className={styles.title}> Automotive News </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 daisyui-loading"></div>
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
                author={noticia.author}
                publishedAt={noticia.publishedAt}
                url={noticia.url}
              />
            </a>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.prevBtn}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.nextBtn}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default News;
