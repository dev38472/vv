import { useSelector } from 'react-redux';
import { agreementStatus } from '@/utils/agreement';
import styles from './AgreementCount.module.scss';
import { AgreementCountButton } from './AgreementCountButton';
import iconDeclined from './declined.svg';
import iconPending from './pending.svg';
import iconSigned from './signed.svg';
import AgreementModel from '@/models/agreementModel';

export interface AgreementCountProps {
  statusFilter: agreementStatus;
  setStatusFilter(value: agreementStatus | null): void;
  agreements?: AgreementModel[];
}

export function AgreementCount(props: AgreementCountProps) {
  const { setStatusFilter, statusFilter, agreements } = props;

  const counts = {
    total: 0,
    accepted: 0,
    declined: 0,
    pending: 0,
    draft: 0,
  };

  for (const agreement of agreements) {
    counts.total++;

    switch (agreement.status) {
      case agreementStatus.Declined:
        counts.declined++;
        break;
      case agreementStatus.Accepted:
        counts.accepted++;
        break;
      case agreementStatus.Pending:
        counts.pending++;
        break;
    }
  }

  return (
    <div className={styles.container}>
      <AgreementCountButton
        title="Declined"
        count={counts.declined.toString()}
        icon={iconDeclined}
        selectedStatusFilter={statusFilter}
        statusFilter={agreementStatus.Declined}
        setStatusFilter={setStatusFilter}
      />

      <AgreementCountButton
        title="Pending"
        count={counts.pending.toString()}
        icon={iconPending}
        selectedStatusFilter={statusFilter}
        statusFilter={agreementStatus.Pending}
        setStatusFilter={setStatusFilter}
      />

      <AgreementCountButton
        title="Signed"
        count={counts.accepted.toString()}
        icon={iconSigned}
        selectedStatusFilter={statusFilter}
        statusFilter={agreementStatus.Accepted}
        setStatusFilter={setStatusFilter}
      />
    </div>
  );
}
