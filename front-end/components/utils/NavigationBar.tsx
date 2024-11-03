import styles from "@/styles/nav.module.css";
import Link from "next/link";

function NavigationBar() {
  return (
    <>
      <div className={`${styles.container}`}>
        <nav className={`${styles.nav}`}>
          <div className={`${styles.nav_logo}`}></div>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/myplants">My Plants</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>Logout</li>
        </nav>
      </div>
    </>
  );
}

export default NavigationBar;
