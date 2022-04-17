import React, {
  FC, Fragment, useEffect, useState,
} from 'react';
import Link from 'next/link';
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container, Row, Col, Tooltip
} from 'reactstrap';
import Image from "next/image";
import templateAgreements from '../../data/templateAgreements';
import { CustomTooltip } from './AgrementPreviewTooltip';
import infoIcon from './info.svg';
import styles from './AgreementPreviewModal.module.scss';
import ButtonCloseModal from '../reusable/ButtonCloseModal';

interface TemplateAgreementSelectorModalProps {
  open: boolean;
  onClose: any;
}

const TemplateAgreementSelectorModal: FC<TemplateAgreementSelectorModalProps> = ({
  open,
  onClose,
}: TemplateAgreementSelectorModalProps) => {
  const templates = templateAgreements;
  const [templateSelected, setTemplateSelected] = useState('');

  useEffect(() => setTemplateSelected(''), [open]);

  return (
    <Modal
      isOpen={open}
      toggle={() => onClose()}
      className="template-agreement-selector-modal"
    >
      <ModalHeader
        toggle={() => onClose()}
        close={<ButtonCloseModal onClick={() => onClose()} />}
      >
        <span className="title">Select Template to Create an Agreement:</span>

      </ModalHeader>
      <ModalBody>
        <ListGroup className="list-group-flush">
          {templates.map((template, index) => (
            <div className={styles.inlineIcon} key={template.code}>
              <Fragment>
                <ListGroupItem
                  active={templateSelected === template.code}
                  className="list-item-grey"
                  tag="button"
                  action
                  onClick={() => setTemplateSelected(template.code)}
                  style={{ marginRight: 4, borderRadius: "10px" }}
                >
                  {template.name}
                </ListGroupItem>
                <CustomTooltip text={template.description} id={`agreement_${index}`} >
                  <Image id={`agreement_${index}`} src={infoIcon} />
                </CustomTooltip>
              </Fragment>
            </div>
          ))}
        </ListGroup>
      </ModalBody >
      <ModalFooter style={{ textAlign: 'center', display: 'inline-block' }}>
        <button
          className="btn-sm button-secondary"
          type="button"
          onClick={() => onClose()}
        >
          <span className="gradient-text">Cancel</span>
        </button>
        {templateSelected ? (
          <Link href={`/new-agreement/${templateSelected}`}>
            <button
              className="btn-sm button-primary"
              type="button"
              disabled={templateSelected === ''}
            >
              Create Agreement
            </button>
          </Link>
        ) : (
          <button
            className="btn-sm button-primary"
            type="button"
            disabled={templateSelected === ''}
          >
            Create Agreement
          </button>
        )}
      </ModalFooter>
    </Modal >
  );
};

export default TemplateAgreementSelectorModal;
