import { NewAgreementButton } from "@/components/agreements/NewAgreementButton";
import styles from "./Empty.module.scss";

export interface EmptyProps {
  isEmpty: boolean;
  onNewAgreementClick(): void;
}

export function Empty(props: EmptyProps) {
  const { isEmpty, onNewAgreementClick } = props;

  if (!isEmpty) {
    return null;
  }

  return (
    <section className={styles.container}>
      <article>
        You don't have any agreements yet. Click bellow to create your first
        standard agreement!
      </article>

      <div className={styles.content}>
        <NewAgreementButton onNewAgreementClick={onNewAgreementClick} />
      </div>
    </section>
  );
}
