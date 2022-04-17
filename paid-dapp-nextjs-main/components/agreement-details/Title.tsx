import { agreementStatus } from "@/utils/agreement";
import { Event } from "@ethersproject/contracts";
import { useEffect, useState } from "react";
import styles from "./Title.module.scss";

export interface TitleProps {
  creation?: Event;
  title?: string;
  status: agreementStatus;
}

export function Title({ creation, title, status }: TitleProps) {
  const [transactionHash, setTranstactionHash] = useState("");
  useEffect(() => {
    creation?.getTransactionReceipt().then((receipt) => {
      setTranstactionHash(receipt.transactionHash);
    });
  }, [creation]);

  let label = "";
  switch (status) {
    case agreementStatus.Accepted:
      label = "signed";
      break;
    case agreementStatus.Declined:
      label = "declined";
      break;
    case agreementStatus.Pending:
      label = "pending";
      break;
  }

  return (
    <div className={styles.container}>
      <h3>{title ?? ""} </h3>
      <div className={styles.label}>
        <div className={styles[label]}>
          {label ?? agreementStatus.Pending}
        </div>
      </div>
      <p>{transactionHash ? `Transaction Hash: ${transactionHash}` : null}</p>
    </div>
  );
}
