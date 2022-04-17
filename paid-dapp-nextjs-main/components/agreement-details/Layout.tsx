import { Event } from '@ethersproject/contracts';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AgreementAcceptedSuccessModal from '@/components/agreements/AgreementAcceptedSuccessModal';
import { AgreementConfirmSignModal } from '@/components/agreements/AgreementConfirmSignModal';
import AgreementPreviewModal from '@/components/agreements/AgreementPreviewModal';
import { ProgressModal } from '@/components/reusable/ProgressModal';
import { agreementStatus } from '@/utils/agreement';
import { ModalSuccess } from '../reusable/modalSuccess';
import { AgreementCard } from './AgreementCard';
import { AgreementLog } from './AgreementLog';
import { Counterparty } from './Counterparty';
import { DocumentAnchor } from './DocumentAnchor';
import { Footer } from './Footer';
import styles from './Layout.module.scss';
import { Title } from './Title';
import { ModalAlert } from '@/components/reusable/modalAlert';
import AgreementModel from '@/models/agreementModel';
import { errors } from 'ethers';

interface LayoutProps {
  agreement?: AgreementModel;
  document?: DocumentAnchor;
  counterparty?: Counterparty;
  acceptedAt?: Date;
  declinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  creationEvent?: Event;
  counterpartyName?: string;
  title?: string;
  fileString?: string;
  onClose(): void;
  sign(approveOrDecline: boolean): Promise<void>;
  transactionComplete: boolean;
  showSuccessSign: boolean;
  showSuccessDecline: boolean;
  loadingMessage: string;
}

export function Layout({
  agreement,
  children,
  document,
  counterparty,
  acceptedAt,
  declinedAt,
  createdAt,
  updatedAt,
  creationEvent,
  counterpartyName,
  title,
  fileString,
  onClose,
  sign,
  transactionComplete,
  showSuccessSign,
  showSuccessDecline,
  loadingMessage,
}: PropsWithChildren<LayoutProps>) {
  const currentWallet = useSelector(
    (state: any) => state.walletReducer.currentWallet,
  );
  const [openConfirmSignModal, setOpenConfirmSignModal] = useState(false);
  const [openConfirmDeclineModal, setOpenConfirmDeclineModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const handleOpenLoading = () => setOpenLoading(true);
  const handleCloseLoading = () => setOpenLoading(false);
  const [agreementError, setAgreementError] = useState(null);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [shouldAllowSign, setAllowSign] = useState(true);
  const [shouldHideSignActions, setHideSignActions] = useState(true);

  useEffect(() => {
    setOpenLoading(!transactionComplete);
  });

  useEffect(() => {
    if (!agreement || !currentWallet) return;
    setHideSignActions(currentWallet !== agreement.counterPartyWallet || agreement.status !== agreementStatus.Pending)
  }, [agreement, currentWallet])

  function onCloseSignSuccessModal() {
    onClose();
  }

  function onCloseDeclinedSuccessModal() {
    onClose();
  }

  function validateErrorProvider(e: string, eCode?: number): string {
    let defaultErrorMessage
    switch (eCode) {
      case -32602:
        defaultErrorMessage = `Your Metamask wallet is locked. Unlock it to be able to sign the agreement.`
        break;

      default:
        defaultErrorMessage = `Error on Sign from smart contract ${e}`
        break;
    }

    return defaultErrorMessage
  }

  async function onApprove() {
    try {
      setOpenConfirmSignModal(false);
      await sign(true);
      setAllowSign(false);
    } catch (error) {
      switch (error.method ? error.method.toString() : error.message) {
        case 'fee()':
        case 'escrow()': {
          setAgreementError('You don’t have enough ETH to process this transaction');
          break;
        }
        default: {
          setAgreementError(validateErrorProvider(error.message, error.code));
          break;
        }
      }
      setOpenAlertModal(true);
    }
  }

  async function onDecline() {
    try {
      setOpenConfirmDeclineModal(false);
      await sign(false);
      setAllowSign(false);
    } catch (error) {
      switch (error.method ? error.method.toString() : error.message) {
        case 'fee()':
        case 'escrow()': {
          setAgreementError('You don’t have enough ETH to process this transaction');
          break;
        }
        default: {
          setAgreementError(validateErrorProvider(error.message, error.code));
          break;
        }
      }
      setOpenAlertModal(true);
    }
  }

  return (
    <div className={`${styles.container} container`}>
      <header className="row">
        <div className="col">
          <h3>Agreement Details</h3>
        </div>
      </header>

      <section className="row">
        <div className="col">
          <Title
            creation={creationEvent}
            title={title}
            status={agreement?.status}
          />
        </div>
      </section>

      <article className="row">
        <div className="col-6">
          <AgreementCard
            document={document}
            counterparty={counterparty}
            acceptedAt={agreement?.acceptedAt}
            declinedAt={agreement?.declinedAt}
            createdAt={createdAt}
            updatedAt={updatedAt}
            counterpartyName={counterpartyName}
          />
        </div>

        <div className="col-6">
          <AgreementLog
            acceptedAt={agreement?.acceptedAt}
            declinedAt={agreement?.declinedAt}
            createdAt={createdAt}
            counterpartyName={counterpartyName}
            counterparty={counterparty}
          />
        </div>
      </article>

      <footer>
        <Footer
          onClose={onClose}
          onOpenPDF={() => setOpenPreviewModal(true)}
          onDecline={() => setOpenConfirmDeclineModal(true)}
          onAccept={() => setOpenConfirmSignModal(true)}
          allowSign={shouldAllowSign}
          shouldHideSignActions={shouldHideSignActions}
        />
      </footer>

      <AgreementPreviewModal
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        fileString={fileString ?? null}
      />

      <AgreementConfirmSignModal
        open={openConfirmSignModal}
        onClose={() => setOpenConfirmSignModal(false)}
        onClick={onApprove}
        title={title}
        message="You’re about to digitally sign this agreement"
        isConfirm
      />

      <AgreementConfirmSignModal
        open={openConfirmDeclineModal}
        onClose={() => setOpenConfirmDeclineModal(false)}
        onClick={onDecline}
        title={title}
        message="You’re about to decline the agreement."
        isConfirm={false}
      />

      <ModalSuccess
        isOpen={showSuccessSign ? true : !!showSuccessDecline}
        onClose={showSuccessSign ? onCloseSignSuccessModal : onCloseDeclinedSuccessModal}
        message={showSuccessSign ? 'You have successfully approved the agreement.' : 'You have successfully declined the agreement.'}
      />

      <ModalAlert
        open={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
        message={agreementError}
      />

      <ProgressModal
        open={openLoading}
        close={handleCloseLoading}
        message={loadingMessage}
      />

      {children}
    </div>
  );
}
