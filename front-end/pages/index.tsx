import Head from "next/head";
import styles from "@/styles/home.module.css";
import NavigationBar from "@/components/utils/NavigationBar";

export default function Home() {
  return (
    <>
      <div className={`${styles.container}`}>
        <Head>
          <title>Rootz</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavigationBar />
        <main className={`${styles.main}`}>
          <p>
            Home moet nog gemaakt worden, MyPlants is wel al voor een stuk af.
          </p>
        </main>
      </div>
    </>
  );
}
