import React from 'react';
import helper from '@/utils/helper';

interface CreatedAtCellProps {
  createdAt: Date;
}

export default function CreatedAtCell({ createdAt }: CreatedAtCellProps) {
  const formattedDate = helper.newFormatDate(new Date(createdAt));
  return <>{formattedDate}</>;
}
