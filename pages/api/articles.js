// pages/api/articles.js
export default async function handler(req, res) {
  const response = await fetch("https://newsstate24.com/wp-json/wp/v2/posts");
  const articles = await response.json();
  res.status(200).json(articles);
}
