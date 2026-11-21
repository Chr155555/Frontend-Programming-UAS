import HomeHero from "./components/home/HomeHero";
import PromoList from "./components/home/PromoList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.homeWrapper}>
      <HomeHero />
      <PromoList />
    </main>
  );
}