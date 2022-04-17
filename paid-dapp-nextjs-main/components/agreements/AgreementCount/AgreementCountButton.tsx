import { agreementStatus } from "@/utils/agreement";
import Image from "next/image";
import styles from "./AgreementCountButton.module.scss";

export interface AgreementButtonProps {
  icon: StaticImageData;
  title: string;
  count: string;
  statusFilter: agreementStatus;
  selectedStatusFilter: agreementStatus;
  setStatusFilter(status: agreementStatus | null): void;
}

export function AgreementCountButton(props: AgreementButtonProps) {
  const { count, icon, title, selectedStatusFilter, statusFilter } = props;
  const isSelected = statusFilter === selectedStatusFilter;

  const classes = [styles.container];
  if (isSelected) {
    classes.push(styles.selected);
  }

  function onClick() {
    if (isSelected) {
      props.setStatusFilter(null);
    } else {
      props.setStatusFilter(statusFilter);
    }
  }

  return (
    <section className={classes.join(" ")} onClick={onClick}>
      <Image src={icon} width={46} height={46} />
      <header>{title}</header>
      <article>{count}</article>
    </section>
  );
}
