import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// import MannualHeader from "./componets/MannualHeader";
import Header from "./componets/Header";
import LotteryEntrance from "./componets/LotteryEntrance";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our smart contract Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  );
}
