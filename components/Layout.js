// components/Layout.js
import Head from "next/head";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>News Site</title>
    </Head>
    <header>News Header</header>
    <main>{children}</main>
    <footer>Footer</footer>
  </div>
);

export default Layout;
