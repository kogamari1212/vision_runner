import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import styles from "../styles/style.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vision Runner</title>
        <meta name="description" content="未来の自分に向けた投稿アプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <Timeline />
        <Footer />
      </main>
    </>
  );
}
