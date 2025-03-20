import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import NewsCard from "@/components/NewsCard";
import styles from "@/styles/home.module.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]); // ✅ Add useState to store news data
 
   useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(
          "https://newsstate24.com/wp-json/wp/v2/posts?per_page=45&_embed"
        );
        setNews(response.data); // ✅ Now setNews is defined
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}></h1>
      <div className={styles.grid}>
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}