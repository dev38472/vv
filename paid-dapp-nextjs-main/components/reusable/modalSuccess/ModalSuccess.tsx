import Image from "next/image";
import { Modal, ModalBody } from "reactstrap";
import successIcon from "./success.svg";
import styles from "./ModalSuccess.module.scss";

export interface ModalSuccessProps {
  isOpen: boolean;
  message: string | null;
  onClose(): void;
}

export function ModalSuccess({ isOpen, message, onClose }: ModalSuccessProps) {
  return (
    <Modal centered isOpen={isOpen} className={styles.container}>
      <ModalBody>
        <Image src={successIcon} width={70} height={70} />

        <header>Success!</header>

        <article>{message}</article>

        <button onClick={onClose}>Great!</button>
      </ModalBody>
    </Modal>
  );
}
