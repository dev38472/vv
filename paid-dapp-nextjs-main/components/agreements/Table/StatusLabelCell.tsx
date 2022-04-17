import React from 'react';
import { agreementStatus } from '@/utils/agreement';
import styles from './StatusLabelCell.module.scss';

export interface StatusLabelProps {
  status: agreementStatus;
}

export function StatusLabelCell(props: StatusLabelProps) {
  let status = '';

  switch (props.status) {
    case agreementStatus.Accepted:
      status = 'signed';
      break;
    case agreementStatus.Declined:
      status = 'declined';
      break;
    default:
      status = 'pending';
  }

  if (!status) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles[status]}>{status}</div>
    </div>
  );
}
