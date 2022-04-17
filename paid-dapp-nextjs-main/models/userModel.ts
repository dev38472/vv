import ProfileModel from './profileModel'
import WalletModel from './walletModels'
import { WalletAddress, Profile } from '../lib/dtos'

interface UserModel {
  email?: string
  did?: string
  profile?: Profile | null
  walletAddresses?: WalletAddress
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export default UserModel
