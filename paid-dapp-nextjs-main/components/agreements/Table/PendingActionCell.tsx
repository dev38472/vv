import React from 'react';
import { useSelector } from 'react-redux';
import { agreementStatus } from '@/utils/agreement';

export interface PendingFunctionCellProps {
  status: agreementStatus;
  recipientAddress: string;
}

export function PendingFunctionCell({
  status,
  recipientAddress,
}: PendingFunctionCellProps) {
  const currentWallet = useSelector(
    (state: { walletReducer: any }) => state.walletReducer.currentWallet,
  );
  const userIsRecipient = currentWallet && currentWallet === recipientAddress;
  let innerText = 'Out For Signature';

  if (status === agreementStatus.Pending && userIsRecipient) {
    innerText = 'Awaiting My Signature';
  }

  if (status !== agreementStatus.Pending) {
    innerText = '-';
  }

  return <>{innerText}</>;
}
