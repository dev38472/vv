import { NetworkName } from '../enums/networkName'

export interface WalletAddress {
  address: string
  network: NetworkName
}

export interface WalletAddressInput extends WalletAddress {}
