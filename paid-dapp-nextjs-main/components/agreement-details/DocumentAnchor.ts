import { BigNumber } from "@ethersproject/bignumber";

export interface DocumentAnchor {
  proposer: string;
  proposerDID: string;
  fileHash: string;
  requiredQuorum: BigNumber;
  templateId: BigNumber;
  metadata: string;
  validUntil: BigNumber;
  status: number;
  acceptedCounterparties: [BigNumber] & { _value: BigNumber };
  declinedCounterparties: [BigNumber] & { _value: BigNumber };
}