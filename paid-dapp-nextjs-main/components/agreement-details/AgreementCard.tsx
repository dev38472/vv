import { PropsWithChildren } from "react";
import { DocumentAnchor } from "./DocumentAnchor";
import styles from "./AgreementCard.module.scss";
import { agreementStatus } from "@/utils/agreement";
import helper from "@/utils/helper";
import { Counterparty } from "./Counterparty";

interface AgreementCardProps {
  document?: DocumentAnchor;
  acceptedAt?: Date;
  declinedAt?: Date;
  counterparty?: Counterparty;
  createdAt?: Date;
  updatedAt?: Date;
  counterpartyName?: string;
}

export function AgreementCard({
  document,
  counterparty,
  acceptedAt,
  declinedAt,
  createdAt,
  updatedAt,
  counterpartyName,
}: PropsWithChildren<AgreementCardProps>) {
  // Some of the lines change according to the agreement's state.
  let lastModified = "-";
  let signer = "-";
  let signedOn = "-";
  if (document?.status == agreementStatus.Accepted) {
    lastModified = lastModified ? helper.newFormatDate(updatedAt) : "-";
    signedOn = acceptedAt ? helper.newFormatDate(acceptedAt) : "-";
    signer = counterparty?.address ?? "-";
  } else if (document?.status == agreementStatus.Declined) {
    lastModified = lastModified ? helper.newFormatDate(updatedAt) : "-";
    signedOn = declinedAt ? helper.newFormatDate(declinedAt) : "-";
    signer = counterparty?.address ?? "-";
  } else {
    lastModified = lastModified ? helper.newFormatDate(updatedAt) : "-";
  }

  return (
    <div className={styles.container}>
      <h4>Details</h4>
      <dl>
        <dt>Counterparty:</dt>
        <dd>{counterpartyName ?? "-"}</dd>

        <dt>Last Modified:</dt>
        <dd>{lastModified}</dd>

        <dt>Created:</dt>
        <dd>{createdAt ? helper.newFormatDate(createdAt) : "-"}</dd>

        <dt>Signed On:</dt>
        <dd>{signedOn}</dd>

        <dt>Signed By:</dt>
        <dd>{signer}</dd>

        <dt>Document File Hash:</dt>
        <dd>{document?.fileHash}</dd>
      </dl>
    </div>
  );
}
