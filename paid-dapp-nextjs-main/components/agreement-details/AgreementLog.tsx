import { DocumentAnchor } from "./DocumentAnchor";
import styles from "./AgreementLog.module.scss";
import helper from "@/utils/helper";
import { useSelector } from "react-redux";
import { Counterparty } from "./Counterparty";

interface AgreementLogProps {
  document?: DocumentAnchor;
  acceptedAt?: Date;
  declinedAt?: Date;
  createdAt?: Date;
  counterparty?: Counterparty;
  counterpartyName?: string;
}

export function AgreementLog({
  acceptedAt,
  declinedAt,
  createdAt,
  counterparty,
  counterpartyName,
}: AgreementLogProps) {
  const currentWallet = useSelector(
    (state: any) => state.walletReducer.currentWallet
  );
  const lines: Array<() => JSX.Element> = [];

  if (createdAt) {
    lines.push(() => (
      <>
        <dt>{helper.newFormatDate(createdAt)}</dt>
        <dd>Agreement Created</dd>

        <dt>{helper.newFormatDate(createdAt)}</dt>
        <dd>{`Sent to ${counterpartyName}`}</dd>
      </>
    ));
  }

  if (acceptedAt) {
    let signerName = counterpartyName;
    if (counterparty?.address === currentWallet) {
      signerName = "You";
    }
    lines.push(() => (
      <>
        <dt>{helper.newFormatDate(acceptedAt)}</dt>
        <dd>
          {signerName} <span className={styles.signed}>signed</span> this
          document
        </dd>
      </>
    ));
  }

  if (declinedAt) {
    let signerName = counterpartyName;
    if (counterparty?.address === currentWallet) {
      signerName = "You";
    }
    lines.push(() => (
      <>
        <dt>{helper.newFormatDate(declinedAt)}</dt>
        <dd>
          {signerName} <span className={styles.declined}>declined</span> this
          document
        </dd>
      </>
    ));
  }

  return (
    <div className={styles.container}>
      <h4>Transaction Log</h4>

      <dl>
        {lines.map((Line, index) => (
          <Line key={index} />
        ))}
      </dl>
    </div>
  );
}
