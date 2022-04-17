import styles from "./CounterpartyNameCell.module.scss";
import Image from "next/image";
import counterpartyIcon from "./counterparty.svg";

export interface CounterpartyNameCellProps {
  name: string;
}

export function CounterpartyNameCell({ name }: CounterpartyNameCellProps) {
  return (
    <div className={styles.counterparty}>
      <Image src={counterpartyIcon} width={23} height={23} />
      <div>{name}</div>
    </div>
  );
}
