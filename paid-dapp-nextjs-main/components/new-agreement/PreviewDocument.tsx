import React, { FC } from "react";
import Link from "next/link";
import { Scrollbar } from "./Scrollbar";
import styles from "./PreviewDocument.module.scss";

interface PreviewDocumentProps {
  templateName: string;
  templateComponent: any;
  isEditing: boolean;
  agreementTitle: string;
  agreementReviewed: boolean;
  onEditMode: any;
  onSubmit: any;
}

function title(agreementReviewed: boolean, agreementTitle: string | null, templateName: string| null, isEditing: boolean): string {
  if (isEditing) {
    return 'Preview';
  } else if (agreementReviewed) {
    if (agreementTitle) {
      return agreementTitle;
    } else {
      return 'Untitled Agreement';
    }
  } else {
    return `Template: ${templateName}`;
  }
}

const PreviewDocument: FC<PreviewDocumentProps> = ({
  templateName,
  templateComponent,
  isEditing,
  agreementTitle,
  agreementReviewed,
  onEditMode,
  onSubmit,
}: PreviewDocumentProps) => (
  <div className={styles.previewDocumentContainer}>
    <div className={styles.previewDocumentHeader}>
      <span>{title(agreementReviewed, agreementTitle, templateName, isEditing)}</span>
    </div>
    <div className={styles.previewDocumentBody}>
      <Scrollbar>
        {templateComponent}
      </Scrollbar>
    </div>

    {!isEditing && !agreementReviewed && (
      <div className={styles.previewDocumentFooter}>
        <Link href="/agreements">
          <button type="button" className="btn button-secondary">
            <span className="gradient-text">Cancel</span>
          </button>
        </Link>
        <button type="button" className="btn button-primary" onClick={() => onEditMode()}>
          Create Agreement
        </button>
      </div>
    )}

    {!isEditing && agreementReviewed && (
      <div className={styles.previewDocumentFooter}>
        <button type="button" className="btn button-secondary" onClick={() => onEditMode()}>
          <span className="gradient-text">Back</span>
        </button>
        <button type="button" className="btn button-primary" onClick={() => onSubmit()}>Approve and Send</button>
      </div>
    )}
  </div>
);

export default PreviewDocument;
