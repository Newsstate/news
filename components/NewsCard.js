import Link from "next/link";
import styles from "@/styles/news.module.css";
import { format } from "date-fns";

export default function NewsCard({ article }) {
  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  // Remove <a> tags from excerpt
  const cleanExcerpt = article.excerpt.rendered.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");

  // Format post date
  const formattedDate = format(new Date(article.date), "dd MMM yyyy, hh:mm a");

  return (
    <Link href={`/news/${article.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {imageUrl ? (
          <img src={imageUrl} alt={article.title.rendered} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}

        <div className={styles.content}>
          <h2 dangerouslySetInnerHTML={{ __html: article.title.rendered }} className={styles.title} />
          
          {/* Post Date & Time */}
          <p className={styles.meta}>🕒 {formattedDate}</p>

          <p dangerouslySetInnerHTML={{ __html: cleanExcerpt }} className={styles.excerpt} />
        </div>
      </div>
    </Link>
  );
}
