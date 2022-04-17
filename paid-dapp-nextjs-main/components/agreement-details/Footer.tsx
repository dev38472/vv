import styles from "./Footer.module.scss";

interface FooterProps {
  shouldHideSignActions: boolean;
  allowSign: boolean;
  onClose(): void;
  onOpenPDF(): void;
  onDecline(): void;
  onAccept(): void;
}

export function Footer({
  shouldHideSignActions,
  allowSign,
  onClose,
  onOpenPDF,
  onDecline,
  onAccept,
}: FooterProps) {
  return (
    <div className={styles.container}>
      <button onClick={onClose}>
        <span>Close</span>
      </button>

      <button
        onClick={onOpenPDF}
        className={shouldHideSignActions ? null : styles.primary}
      >
        <span>Open PDF</span>
      </button>

      {!shouldHideSignActions ? (
        <>
          <button onClick={onDecline} className={styles.primary}>
            <span>Decline Agreement</span>
          </button>

          <button onClick={onAccept} className={styles.primary}>
            <span>Accept Agreement</span>
          </button>
        </>
      ) : ('')}
    </div>
  );
}
