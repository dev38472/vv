import Head from "next/head";
import styles from "./BinanceChainPage.module.scss";
import Link from "next/link";

const BSC_BRIDGE_URL = "https://bridge.paidnetwork.com/paid";

export function BinanceChainPage() {
  return (
    <div className={`${styles.container} container`}>
      <Head>
        <title>Binance Smart Chain</title>
      </Head>

      <header>
        <h3>BSC Bridge</h3>
      </header>

      <section>
        <div className={styles.card}>
          <header>
            <h4>Paid Network Cross-Chain Token Bridge [BETA]</h4>
          </header>

          <article>
            You can use this token bridge to swap Paid Network tokens across
            Networks with ease
          </article>

          <footer>
            <Link href={BSC_BRIDGE_URL}>
              <a target="_blank">
                <div>Learn More</div>
              </a>
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}
