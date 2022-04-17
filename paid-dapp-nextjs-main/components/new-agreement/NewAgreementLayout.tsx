import { PropsWithChildren } from "react";
import styles from "./NewAgreementLayout.module.scss";

export interface NewAgreementLayoutProps {}

/**
 * Holds the styles for most of the page's layout.
 */
export function NewAgreementLayout({
  children,
}: PropsWithChildren<NewAgreementLayoutProps>) {
  const classes = [styles.page, "container-fluid"].join(" ");
  return <div className={classes}>{children}</div>;
}
