export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("https://newsstate24.com/wp-json/wp/v2/posts?per_page=100");
      const posts = await response.json();

      // Fetch images for each post
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          if (post.featured_media) {
            const mediaResponse = await fetch(
              `https://newsstate24.com/wp-json/wp/v2/media/${post.featured_media}`
            );
            const mediaData = await mediaResponse.json();
            post.featured_image = mediaData.source_url || null;
          } else {
            post.featured_image = null;
          }
          return post;
        })
      );

      return res.status(200).json({ articles: updatedPosts });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch news" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
