// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Newsstate24</title>
        <meta name="description" content="Latest News from Newsstate24" />
      </Head>

      <header>
        <h1>Welcome to Newsstate24</h1>
        <nav>
          <Link href="/about">About Us</Link>
        </nav>
      </header>

      <main>
        <h2>Latest Articles</h2>
        <p>Stay tuned for the latest news and updates.</p>
      </main>

      <footer>
        <p>© 2025 Newsstate24</p>
      </footer>
    </div>
  );
}
