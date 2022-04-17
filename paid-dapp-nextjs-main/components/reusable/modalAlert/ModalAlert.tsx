import React from "react";
import PdSvgWarning from "@/components/reusable/pdSvgIcon/PdSvgWarning";
import { Modal, ModalBody } from "reactstrap";
import styles from "./ModalAlert.module.scss";

interface ModalAlertProps {
  open: boolean;
  message: string;
  onClose(): void;
}

export function ModalAlert({ open, onClose, message }: ModalAlertProps) {
  return (
    <Modal isOpen={open} centered className={styles.container}>
      <ModalBody>
        <PdSvgWarning className="" color="danger" />

        <header>We're sorry!</header>

        <article>{message}</article>

        <button onClick={onClose}>Try Again</button>
      </ModalBody>
    </Modal>
  );
}
