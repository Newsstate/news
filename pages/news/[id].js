import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/article.module.css";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchArticle() {
      try {
        const response = await axios.get(
          `https://newsstate24.com/wp-json/wp/v2/posts/${id}?_embed`
        );

        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load article.");
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Fetch the image from the API response
  const imageUrl =
    article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  // Format post date and time
  const postDate = new Date(article.date).toLocaleString("en-US", {
    day: "numeric",
    weekday: "long",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{article?.title?.rendered} | NewsState24</title>
        <meta
          name="description"
          content={article?.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, "")}
        />
      </Head>

      <div className={styles.container}>
        {/* Headline (Title) */}
        <h1
          dangerouslySetInnerHTML={{
            __html: article.title.rendered,
          }}
          className={styles.title}
        />

        {/* Post Date and Time */}
        <p className={styles.postDate}>{postDate}</p>

        {/* Excerpt */}
        <p
          dangerouslySetInnerHTML={{
            __html: article.excerpt.rendered.replace(
              /(<([^>]+)>)/gi,
              ""
            ),
          }}
          className={styles.excerpt}
        />

        {/* Featured Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title.rendered}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}

        {/* Article Content */}
        <div
          dangerouslySetInnerHTML={{
            __html: article.content.rendered,
          }}
          className={styles.content}
        />
      </div>
    </>
  );
}
