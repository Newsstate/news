import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/article.module.css";

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        console.log("Fetching article for slug:", slug);

        // Fetch all posts and find the one with the matching slug
        const response = await axios.get(`https://newsstate24.com/wp-json/wp/v2/posts?per_page=100`);

        const foundArticle = response.data.find(post =>
          post.slug === slug
        );

        if (!foundArticle) throw new Error("Article not found");

        setArticle(foundArticle);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err.message);
        setError("Failed to load article. Please try again.");
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{article?.title?.rendered} | NewsState24</title>
        <meta name="description" content={article?.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, "")} />
      </Head>

      <div className={styles.container}>
        <h1 dangerouslySetInnerHTML={{ __html: article.title.rendered }} className={styles.title} />

        {article.jetpack_featured_media_url ? (
          <img
            src={article.jetpack_featured_media_url}
            alt={article.title.rendered}
            className={styles.image}
          />
        ) : (
          <p className={styles.noImage}>No Image Available</p>
        )}

        <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} className={styles.content} />
      </div>
    </>
  );
}
