import React, { FC } from 'react';
import {
  Modal, Button, ModalBody,
} from 'reactstrap';
import styles from "./AgreementConfirmSignModal.module.scss"
import { useState } from "react"

interface AgreementConfirmSignModalProps {
  open: boolean;
  onClose(): void;
  onClick(): void;
  title: string;
  message: string;
  isConfirm: boolean
}

export function AgreementConfirmSignModal({
  open,
  onClose,
  onClick,
  title,
  message,
  isConfirm,
}: AgreementConfirmSignModalProps) {
  const [isTermsAccepted, setTermsAccepted] = useState(false);

  const handleTermsAccepted = () => {
    setTermsAccepted(!isTermsAccepted)
  }

  return (
    <Modal
      isOpen={open}
      toggle={() => onClose()}
      className={styles.container} 
      centered
    >
      <ModalBody>
      <header>{title}</header>

      <p>{message}</p>

      {(isConfirm === true) ? (
        <div className={styles.checkBoxContainer}>
          <input className={styles.checkbox} name="acceptTerms" type="checkbox" checked={isTermsAccepted} onChange={handleTermsAccepted}/>
          <p>I agree to be legally bound by this document and the Paid Network <a href="https://paidnetwork.com/terms-of-service/" target="_blank">&nbsp;Terms of Service.</a></p>
        </div>
      ) : ('')}

      <div className={styles.modalActions}>
        <button
          type="submit" className={`btn ${styles.dismissButton}`}
          onClick={onClose}
        >
          <span>Back</span>
        </button>

          <button
            type="submit" className={ (isConfirm === false || isTermsAccepted) ? `btn button-primary` : `btn button-primary ${styles.nohover}`}
            disabled={(isConfirm === true && !isTermsAccepted)}
            onClick={onClick}
          >
          {(isConfirm === true) ? ('Confirm') : ('Decline')}
        </button>
      </div>
      </ModalBody>
    </Modal>
  )
}
