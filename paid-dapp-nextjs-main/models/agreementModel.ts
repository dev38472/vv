import { agreementStatus } from '@/utils/agreement';
import dataAgreementModel from './dataAgreementModel';
import EventAgreementModel from './eventAgreementModel';

interface AgreementModel {
    logIndex?: number;
    transactionIndex?: number,
    transactionHash?: string;
    blockHash?: string;
    blockNumber?: number;
    address?: object;
    event: EventAgreementModel;
    data?: dataAgreementModel;
    title: string;
    cid: string;
    counterPartyEmail: string;
    counterPartyName: string;
    counterPartyWallet: string;
    createdAt: Date;
    partyEmail: string;
    status: agreementStatus;
    updatedAt: Date;
    acceptedAt?: Date;
    declinedAt?: Date;
    _id: string;
}

export default AgreementModel;
