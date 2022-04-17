import { PropsWithChildren } from "react";
import Scrollbars from "react-custom-scrollbars";
import styles from "./Scrollbar.module.scss";

function renderTrack(props: any) {
  return <div {...props} className={styles.track} />;
}

function renderThumb(props: any) {
  return <div {...props} className={styles.thumb} />;
}

function renderInnerView(props: any) {
  return <div {...props} className={styles.content} />;
}

export function Scrollbar({ children }: PropsWithChildren<{}>) {
  return (
    <Scrollbars
      renderView={renderInnerView}
      renderTrackVertical={renderTrack}
      renderThumbVertical={renderThumb}
    >
      {children}
    </Scrollbars>
  );
}
