import Link from "next/link";
import styles from "@/styles/navbar.module.css"; // Assuming you have styles for navbar

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {/* Website Name Link */}
        <Link href="/" className={styles.siteName}>
          Newsstate24
        </Link>

        {/* Other navigation links */}
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
       
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
