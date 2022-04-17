interface WalletStateModel {
  currentWallet: string | null
  loading: boolean
  provider: string
  openProvider: boolean
  isDisconnecting: false
  chainId: number
}

export default WalletStateModel
