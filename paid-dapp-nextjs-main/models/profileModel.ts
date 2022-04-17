interface ProfileModel extends WalletExtend {
  email?: string
  did?: any
  lastLoginAt?: string
  createdAt?: string
  updatedAt?: string


  firstName?: string
  lastName?: string
  streetAddress?: string
  profileName?: string

}

interface WalletExtend {
  walletId?: string
}

export default ProfileModel
