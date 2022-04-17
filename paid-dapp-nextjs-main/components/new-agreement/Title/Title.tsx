import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import editIcon from "./edit.svg";
import styles from "./Title.module.scss";
import { TitleForm } from "./TitleForm";

export interface TitleProps {
  agreementTitle: string | null;
  setAgreementTitle(value: string): void;
}

export function Title({ agreementTitle, setAgreementTitle }: TitleProps) {
  const isEditing = useSelector(
    (state: { agreementReducer: any }) => state.agreementReducer.isEditing
  );
  const [editTitle, setEditTitle] = useState(false);

  if (editTitle) {
    return (
      <TitleForm
        agreementTitle={agreementTitle}
        onSubmit={(values) => {
          setAgreementTitle(values.title);
          setEditTitle(false);
        }}
        onCancel={() => setEditTitle(false)}
      />
    );
  } else {
    if (isEditing) {
      return (
        <div className={styles.editable} onClick={() => setEditTitle(true)}>
          <h3>{agreementTitle ?? "Untitled Agreement"}</h3>

          <Image src={editIcon} width={34} height={34} />
        </div>
      );
    } else {
      return (
        <div className={styles.static}>
          <h3>PDF Preview</h3>
        </div>
      );
    }
  }
}
