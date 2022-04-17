import { NetworkName } from '../enums/networkName'

export interface AgreementSigned {
  documentId: string
  agreementTitle: string
  network: NetworkName
  proponentDid: string
}

export interface AgreementSignedInput extends AgreementSigned {}
