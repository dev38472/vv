interface EventAgreementModel {
  id: number;
  from?: number,
  to?: number,
  agreementFormTemplateId?: number;
  cid?: number;
  status?: number;
  signedOn?: string;
  createdAt?: string;
  updatedAt?: string;
  proposerAddress?: string;
  recipientAddress?: string;
  blockNumber?: number;
}

export default EventAgreementModel;
