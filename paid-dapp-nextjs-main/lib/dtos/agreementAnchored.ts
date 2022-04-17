import { NetworkName } from '../enums/networkName'

export interface AgreementAnchored {
  documentId: string
  network: NetworkName
  agreementTitle: string
  counterpartyName: string
  counterpartyEmail: string
  counterpartyWalletAddress: string
}

export interface AgreementAnchoredInput extends AgreementAnchored {}
