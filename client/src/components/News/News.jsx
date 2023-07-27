import React, { useEffect, useState } from "react";
import Card from "./NewsCard";
import styles from "./NewsPage.module.css";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import Footer from "../Footer/Footer";

const News = () => {
  const news = [
    {
      source: {
        id: "business-insider",
        name: "Business Insider"
      },
      author: "Graham Rapier,Tim Levin,Grace Dean,Jyoti Mann,Pete Syme",
      title: "Tesla models, prices, charging, stock: A complete guide to the electric car maker",
      description: "A complete Tesla guide, from working at the EV maker to TSLA stock history, current and future cars, charging, features, and owner pros and cons.",
      url: "https://www.businessinsider.com/tesla",
      urlToImage: "https://www.businessinsider.com/public/assets/BI/US/og-image-logo-social.png",
      publishedAt: "2023-07-25T07:28:01Z",
      content: "<ul>\n<li>Tesla has introduced innovative features and products, from its lineup of models to Autopilot.</li>\n<li>Tesla also faces competition from other electric vehicle startups.</li>\n<li>The compan… [+11926 chars]"
    },
    {
      source: {
        id: "fox-news",
        name: "Fox News"
      },
      author: "Kurt Knutsson, CyberGuy Report",
      title: "Hyundai's new car makes parallel parking a breeze",
      description: "Do you get stressed trying to parallel park? Kurt \"The CyberGuy\" Knutsson reveals how Hyundai's new eco-friendly car can help ease your parking fears.",
      url: "https://www.foxnews.com/tech/hyundais-car-makes-parallel-parking-breeze",
      urlToImage: "https://static.foxnews.com/foxnews.com/content/uploads/2023/06/1-Cant-parallel-park-no-problem-Hyundais-new-technology-lets-anyone-crab-walk-into-tight-spaces.jpg",
      publishedAt: "2023-06-30T15:44:23Z",
      content: "Rock Lobster? More like Crab Walker. Don't be fooled, though. This baby isn't a Chrysler, it's nowhere near as big as a whale, and sadly, it won't carry 20 of your closest friends to your next beach … [+3436 chars]"
    },
    {
      source: {
        id: null,
        name: "Autoblog"
      },
      author: "Byron Hurd",
      title: "Prodrive P25 First Drive Review: Your video game fantasy brought to life",
      description: "Filed under:\n Aftermarket,Subaru,New Car Reviews,Coupe,Off-Road Vehicles,Special and Limited Editions,Performance\n Continue reading Prodrive P25 First Drive Review: Your video game fantasy brought to life\nProdrive P25 First Drive Review: Your video game fanta…",
      url: "https://www.autoblog.com/2023/07/19/subaru-prodrive-p25-first-drive-review/",
      urlToImage: "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.aolcdn.com/os/ab/_cms/2023/07/18153831/2023_Subaru_ProDrive_Milbrook_039.jpg",
      publishedAt: "2023-07-19T13:00:00Z",
      content: "BEDFORD, England. It has been a mere three hours since I walked out of London Heathrow following an eight-hour flight from Detroit. The Prodrive P25 Im sitting in couldnt possibly be any more unassum… [+5594 chars]"
    },
    {
      source: {
        id: null,
        name: "Autoblog"
      },
      author: "Joel Stocksdale",
      title: "2023 Hyundai Ioniq 6 Review: Stylish, sporty electric economy",
      description: "Filed under:\n Green,Hyundai,New Car Reviews,Electric,Sedan\n Continue reading 2023 Hyundai Ioniq 6 Review: Stylish, sporty electric economy\n2023 Hyundai Ioniq 6 Review: Stylish, sporty electric economy originally appeared on Autoblog on Tue, 27 Jun 2023 06:00:…",
      url: "https://www.autoblog.com/2023/06/27/2023-hyundai-ioniq-6-ev-buying-guide-review/",
      urlToImage: "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.aolcdn.com/os/ab/_cms/2023/04/31143219/2023-Hyundai-ioniq-6-SE-RWD-Long-Range-01.jpg",
      publishedAt: "2023-06-27T10:00:00Z",
      content: "Pros:Fun, efficient driving; interesting design; useful tech; up to 361 miles of range\r\nCons: Tight rear head room; small trunk; no federal EV tax credit\r\nFew electric cars are as striking as the Hyu… [+10098 chars]"
    },
    {
      source: {
        id: null,
        name: "Autoblog"
      },
      author: "Zac Palmer",
      title: "2023 Nissan Z vs. 2023 Toyota GR Supra Comparison Test Review",
      description: "Filed under:\n Nissan,Toyota,New Car Reviews,Coupe,Performance,Comparison\n Continue reading 2023 Nissan Z vs. 2023 Toyota GR Supra Comparison Test Review\n2023 Nissan Z vs. 2023 Toyota GR Supra Comparison Test Review originally appeared on Autoblog on Thu, 6 Ju…",
      url: "https://www.autoblog.com/2023/07/06/nissan-z-vs-toyota-gr-supra-manual-comparison-test/",
      urlToImage: "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.aolcdn.com/os/ab/_cms/2023/07/05100228/IMG_97282.jpg",
      publishedAt: "2023-07-06T10:00:00Z",
      content: "PINCKNEY, Mich. You might hear this a lot these days, but it bears repeating: The glory days of internal combustion performance vehicles are right now. That fact is evident all across the industry, b… [+9804 chars]"
    },
    {
      source: {
        id: null,
        name: "Autoblog"
      },
      author: "Autoblog Staff",
      title: "Amazon Prime Day Car Accessory Deals 2023",
      description: "Filed under:\n Commerce\n Continue reading Amazon Prime Day Car Accessory Deals 2023\nAmazon Prime Day Car Accessory Deals 2023 originally appeared on Autoblog on Tue, 11 Jul 2023 06:30:00 EDT. Please see our terms for use of feeds.\nPermalink | \nEmail this | \n C…",
      url: "https://www.autoblog.com/article/amazon-prime-day-automotive-deals-2023/",
      urlToImage: "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.yimg.com/os/creatr-uploaded-images/2023-07/8ae5de00-1f4c-11ee-ad63-fbd8bacce72f",
      publishedAt: "2023-07-11T10:30:00Z",
      content: "Autoblog may receive a share from purchases made via links on this page. Pricing and availability are subject to change.\r\nLooking for the best automotive deals to come out of Prime Day 2023? Well, lo… [+27296 chars]"
    },
    {
      source: {
        id: null,
        name: "Small Business Trends"
      },
      author: "Kevin Ocasio",
      title: "Discovering the Best Car Rental App: The 11 Best Options in 2023",
      description: "In this article, we'll take a look at 11 of the best car rental app options available in 2023 that will make sure your travels go smoothly. Let's get started!",
      url: "https://smallbiztrends.com/2023/07/car-rental-app.html",
      urlToImage: "https://media.smallbiztrends.com/2023/01/Discovering-the-Best-Car-Rental-App.png",
      publishedAt: "2023-07-17T01:31:39Z",
      content: "Whether youre planning a weekend road trip, need an economy-sized vehicle for an upcoming business meeting, or just need to get around for a few days in a different city, the best car rental apps can… [+23580 chars]"
    },
    {
      source: {
        id: null,
        name: "Small Business Trends"
      },
      author: "Michael Guta",
      title: "Sun Shades for Car Windows: Cool Picks for Your Vehicle",
      description: "Safeguard your vehicle's interior and passengers from harmful UV rays, excessive heat, and glare with sun shades for car windows.",
      url: "https://smallbiztrends.com/2023/07/sun-shades-for-car-windows.html",
      urlToImage: "https://media.smallbiztrends.com/2023/07/EcoNour-Car-Windshield-Sun-Shade.jpg",
      publishedAt: "2023-07-18T23:00:08Z",
      content: "If you buy something through our links, we may earn money from our affiliate partners. Learn more.\r\nSun shades for car windows are more than just a car accessory. They provide a critical line of defe… [+40337 chars]"
    },
    {
      source: {
        id: null,
        name: "Autoblog"
      },
      author: "Autoblog Staff",
      title: "Best Amazon Prime Day Deals 2023",
      description: "Filed under:\n Commerce\n Continue reading Best Amazon Prime Day Deals 2023\nBest Amazon Prime Day Deals 2023 originally appeared on Autoblog on Tue, 11 Jul 2023 07:55:00 EDT. Please see our terms for use of feeds.\nPermalink | \nEmail this | \n Comments",
      url: "https://www.autoblog.com/article/2023-amazon-prime-day/",
      urlToImage: "https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.yimg.com/os/creatr-uploaded-images/2023-07/495b9700-1fcd-11ee-bff8-15b3b2cea703",
      publishedAt: "2023-07-11T11:55:00Z",
      content: "Autoblog may receive a share from purchases made via links on this page. Pricing and availability are subject to change.\r\nAmazon Prime Day 2023 has officially arrived! We'll spare you the song and da… [+38975 chars]"
    },
    {
      source: {
        id: null,
        name: "Coolmaterial.com"
      },
      author: "Dillon McLaughlin",
      title: "The Fastest Electric Cars on the Market",
      description: "Electric cars are becoming increasingly popular, and for good reason. They’re more efficient and environmentally friendly than gas-powered cars, and they’re starting to offer the same level of performance. In fact, some of the fastest…\nThe post The Fastest El…",
      url: "https://coolmaterial.com/rides/fastest-electric-cars/",
      urlToImage: "https://coolmaterial.com/wp-content/uploads/2023/07/Electric-Cars.jpg",
      publishedAt: "2023-07-20T14:45:04Z",
      content: "Electric cars are becoming increasingly popular, and for good reason. Theyre more efficient and environmentally friendly than gas-powered cars, and theyre starting to offer the same level of performa… [+5189 chars]"
    }
  ];
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const pageSize = 10;

  // useEffect(() => {
  //   getNews();
  //   // const apiKey = "84432522b9bf4608bfb735a7732a2ae3";
  //   // const keywords = ["cars", "vehicles", "car reviews"];
  //   // const keywordString = keywords.join(" ");
  //   // const url = `https://newsapi.org/v2/everything?q=${keywordString}&apiKey=${apiKey}&pageSize=${pageSize}&page=1`;

  //   // axios
  //   //   .get(url)
  //   //   .then((response) => {
  //   //     setNews(
  //   //       response.data.articles.map((noticia) => ({
  //   //         ...noticia,
  //   //         imageLoaded: true,
  //   //       }))
  //   //     );
  //   //     setTotalPages(Math.ceil(response.data.totalResults / pageSize));
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error making the request:", error);
  //   //     setLoading(false);
  //   //   });
  // }, []);

  // const noticiasConImagenesValidas = news.filter(
  //   (noticia) => noticia.urlToImage && noticia.imageLoaded
  // );

  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  return (
    <div className="bg-[#F0F8FF]">
      <NavBar />
      <h1 className={styles.title}> Automotive News </h1>
        <div className={styles.card}>
          {news.map((noticia, index) => (
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
      {/* {totalPages > 1 && (
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
      )} */}
      <Footer />
    </div>
  );
};

export default News;
