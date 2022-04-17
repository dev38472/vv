import Image from "next/image";
import { Button } from "reactstrap";
import styles from "./index.module.scss";

export interface NewAgreementButtonProps {
  onNewAgreementClick(): void;
}

export function NewAgreementButton({
  onNewAgreementClick,
}: NewAgreementButtonProps) {
  return (
    <Button onClick={onNewAgreementClick} className={styles.container}>
      <Image src="/assets/icon/plus.svg" width={18} height={18} />
      <label>New Agreement</label>
    </Button>
  );
}
