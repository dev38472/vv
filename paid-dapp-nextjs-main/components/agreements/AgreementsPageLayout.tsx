import { PropsWithChildren } from "react";
import styles from "./AgreementsPageLayout.module.scss";

interface AgreementsPageLayoutProps {}

export function AgreementsPageLayout(
  props: PropsWithChildren<AgreementsPageLayoutProps>
) {
  const classes = [styles.container, "container"].join(" ");
  return <div className={classes}>{props.children}</div>;
}
