import { NONAME } from "dns";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import styles from "./ConfirmAgreementModal.module.scss";
import warningIcon from "./warning.svg";

interface ConfirmAgreementModalProps {
  open: boolean;
  onClick(): void;
  onDismiss(): void;
  title: string;
  partyName: string;
  partyEmail: string;
  partyWallet: string;
}

export function ConfirmAgreementModal({
  open,
  onDismiss,
  onClick,
  title,
  partyName,
  partyEmail,
  partyWallet,
}: ConfirmAgreementModalProps) {
  const [isTermsAccepted, setTermsAccepted] = useState(false);

  const handleTermsAccepted = () => {
    setTermsAccepted(!isTermsAccepted)
  }

  return (
    <Modal isOpen={open} className={styles.container} centered>
      <ModalBody>
        <header>{title}</header>

        <p>
          The agreement will be sent to <span className="gradient-text">&nbsp;{partyName} ({partyEmail})&nbsp;</span> to wallet address:
        </p>

        <p className="gradient-text">
          {partyWallet}
        </p>

        <p>
          The agreement will be pending for approval for <span className="gradient-text">&nbsp;14 days.</span>
        </p>

        <div className={styles.checkBoxContainer}>
          <input className={styles.checkbox} name="acceptTerms" type="checkbox" checked={isTermsAccepted} onChange={handleTermsAccepted}/>
          <p>I agree to be legally bound by this document and the Paid Network <a href="https://paidnetwork.com/terms-of-service/" target="_blank">&nbsp;Terms of Service.</a></p>
        </div>

        <p>Click on 'Agree and Send' to sign this document.</p>

        <div className={styles.modalActions}>
        <button
          type="submit" className={`btn ${styles.dismissButton}`}
          onClick={onDismiss}
        >
          <span>Back</span>
        </button>

          <button
            type="submit" className={ isTermsAccepted ? `btn button-primary` : `btn button-primary ${styles.nohover}`}
            disabled={!isTermsAccepted}
            onClick={onClick}
          >
          Agree and send
        </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
