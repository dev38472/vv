import React from 'react';
import helper from "@/utils/helper";

interface SignedOnCellProps {
  acceptedAt?: Date;
  declinedAt?: Date;
}

export function SignedOnCell({ acceptedAt, declinedAt }: SignedOnCellProps) {
  let formattedDate;
  formattedDate = '-';

  if (acceptedAt != null) {
    formattedDate = helper.newFormatDate(new Date(acceptedAt));
  } else if (declinedAt != null) {
    formattedDate = helper.newFormatDate(new Date(declinedAt));
  }
  return <>{formattedDate}</>;
}
