import Head from "next/head";
import styles from "./AgreementBlockedChainPage.module.scss";
import Link from "next/link";

const BSC_METAMASK_URL = "https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain";

export function AgreementBlockedChainPage() {
  return (
    <div className={`${styles.container} container`}>
      <Head>
        <title>Agreement Blocked</title>
      </Head>

      <header>
        <h3>Standard Agreements</h3>
      </header>

      <section>
        <div className={styles.card}>
          <header>
            <h4>Please use the Binance Smart Chain Testnet network</h4>
          </header>

          <article>
            <p>The PAID dapp Standard Agreements are currently available only on Binance Smart Chain Testnet.Please switch network in Metamask to Binance Smart Chain Testnet.</p>
            <p>Click "Learn More" for instructions how to connect Metamask to Binance Smart Chain.</p>
          </article>

          <footer>
            <Link href={BSC_METAMASK_URL}>
              <a target="_blank">
                <div>Learn More</div>
              </a>
            </Link>
          </footer>
        </div>
      </section>
    </div >
  );
}
