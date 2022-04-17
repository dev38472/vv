import React from "react";
import Form from '@rjsf/core';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import styles from './PdJsonSchemaForm.module.scss';

interface NewInventionModalProps {
  open: boolean,
  currentPageSchema: any,
  uiSchema: any,
  widgets: any,
  transformErrors: any,
  fieldTemplate: any,
  formData: any,
  isEditing: boolean,
  onCloseModal(): void
  onSubmit({formData}): void
}

export function NewInventionModal({
  open,
  currentPageSchema,
  uiSchema,
  widgets,
  transformErrors,
  fieldTemplate,
  formData,
  isEditing,
  onCloseModal,
  onSubmit
}: NewInventionModalProps) {

  return (
    <Modal isOpen={open}>
      <ModalHeader className={styles.modalHeader}>
        <span className={styles.title}>New Invention</span>
      </ModalHeader>
      <ModalBody>
      <Form
          schema={currentPageSchema}
          uiSchema={uiSchema}
          widgets={widgets}
          onSubmit={(formData) => { onSubmit(formData); onCloseModal() }}
          showErrorList={false}
          transformErrors={transformErrors}
          FieldTemplate={fieldTemplate}
          className={styles.inventionForm}
          formData={formData}
        >
          <div className={styles.modalActions}>
            <button type="button" className={`btn ${styles.buttonSecondary}`} onClick={onCloseModal}><span className={styles.btnText}>Cancel</span></button>
            <button type="submit" className={`btn ${styles.addBtn}`}>
              <span className={styles.btnText}>
                {(isEditing === true) ? ('Save Invention') : ('Add Invention')}
              </span>
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}