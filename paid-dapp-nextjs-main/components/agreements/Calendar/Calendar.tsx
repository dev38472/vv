import styles from "./Calendar.module.scss";

export function Calendar() {
  const today = new Date();

  const dateString = `${today.toLocaleDateString("en-US", {
    day: "2-digit",
  })} ${today.toLocaleDateString("en-US", {
    month: "long",
  })}`;

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <header>{dateString}</header>

        <article>
          <div className={styles.empty}>
            Here you will see notifications related to your agreements
          </div>
        </article>
      </div>
    </section>
  );
}
