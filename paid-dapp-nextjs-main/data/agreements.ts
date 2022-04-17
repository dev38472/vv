import AgreementModel from '../models/agreementModel';
import { agreementStatus } from '../utils/agreement';

const agreementsData: AgreementModel[] = [
  {
    title: 'title',
    cid: '0x1',
    counterPartyEmail: 'b@b.com',
    counterPartyName: 'Test Name',
    counterPartyWallet: '0x0',
    createdAt: new Date(),
    partyEmail: 'a@a.com',
    status: agreementStatus.Pending,
    updatedAt: new Date(),
    acceptedAt: new Date(),
    declinedAt: new Date(),
    _id: '0',
    logIndex: 0,
    transactionIndex: 1,
    transactionHash: '0x9e81de93dC...47e6d64b70ff1dF',
    blockHash: '0x9e81de93dC...47e6d64b70ff1dF',
    blockNumber: 12,
    address: null,
    event: {
      id: 1,
      from: 1,
      to: 2,
      agreementFormTemplateId: 1,
      cid: 1,
      status: agreementStatus.Pending,
      createdAt: '12/21/2020 18:16:53',
      updatedAt: '12/21/2020 18:16:53',
    },
    data: {
      documentName: 'Mutual NDA',
      counterpartyName: 'Jacob Jones',
      agreementForm: null,
      agreementFormTemplateId: 'nda',
      escrowed: null,
      validUntil: '12/21/2023',
      toSigner: null,
      fromSigner: null,
    },
  },
];

export default agreementsData;
