import { ethers } from "ethers";
import { useWallet } from "react-binance-wallet";

declare global {
  interface Window {
    ethereum: any;
    BinanceChain: any;
  }
}

export default function useProvider() {
  const { chainId } = useWallet();

  const metamask = window.ethereum;
  const provider = new ethers.providers.Web3Provider(metamask, "any");
  let anchoringAddress: string;
  let escrowAddress: string;
  let paidTokenAddress: string;
  if (chainId === 97 || chainId === 56) {
    anchoringAddress = process.env.NEXT_PUBLIC_CONTRACT_ANCHORINNG_ADDRESS;
    escrowAddress = process.env.NEXT_PUBLIC_CONTRACT_ESCROW_ADDRESS;
    paidTokenAddress = process.env.NEXT_PUBLIC_CONTRACT_PAID_TOKEN_ADDRESS;
  } else {
    anchoringAddress = process.env.NEXT_PUBLIC_CONTRACT_ETH_ADDRESS;
    escrowAddress = process.env.NEXT_PUBLIC_CONTRACT_ETH_ESCROW_ADDRESS;
    paidTokenAddress = process.env.NEXT_PUBLIC_CONTRACT_ETH_PAID_TOKEN_ADDRESS;
  }

  return {
    provider,
    anchoringAddress,
    escrowAddress,
    paidTokenAddress,
  };
}
