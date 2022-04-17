import { Profile } from './profile'
import { WalletAddress } from './walletAddress'

export interface User {
  email?: string
  did?: string
  lastLoginAt?: string
  profile?: Profile | null
  walletAddresses?: [WalletAddress] | null
  createdAt: string
  updatedAt: string
}
