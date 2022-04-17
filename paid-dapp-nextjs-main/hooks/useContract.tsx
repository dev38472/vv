import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useWallet } from 'react-binance-wallet';
import { JsonFragment } from '@ethersproject/abi';
import {
  getTokenEscrowAbi,
  getSmartAgreementAnchoringAbi,
} from '@master-ventures/paid-dapp-contracts';
import { SmartAgreementAnchoring, TokenEscrow } from 'types/typechain';
import PaidTokenContract from '../contracts/PaidTokenContract.json';
import useProvider from './useProvider';
import { useSelector } from 'react-redux'

function useContract() {
  const { account, chainId } = useWallet();
  const [contract, setContract] = useState<SmartAgreementAnchoring>(null);
  const [contractSigner, setContractSigner] = useState<SmartAgreementAnchoring>(null);
  const [escrowContract, setEscrowContract] = useState<TokenEscrow>(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [tokenSignerContract, setTokenSignerContract] = useState(null);
  const [networkName, setNetworkName] = useState(null);
  const {
    provider, anchoringAddress: anchorinngAddress, escrowAddress, paidTokenAddress,
  } = useProvider();
  const currentWallet = useSelector<any, any>((state) => state.walletReducer.currentWallet)

  const handleContract = () => {
    try {
      const abi = getSmartAgreementAnchoringAbi<JsonFragment>();
      const Contract = new ethers.Contract(
        anchorinngAddress,
        abi,
        provider,
      ) as SmartAgreementAnchoring;
      setContract(Contract);
    } catch (error) {
      console.info(
        'Contract cannot be initialized. Please make sure you are on the right network',
      );
    }
  };

  const handleContractSigner = async () => {
    try {
      const signer = provider.getSigner(account);
      const abi = getSmartAgreementAnchoringAbi<JsonFragment>();
      const ContractSigner = new ethers.Contract(
        anchorinngAddress,
        abi,
        signer,
      ) as SmartAgreementAnchoring;
      setContractSigner(ContractSigner);
    } catch (error) {
      console.info(
        'Contract Signer cannot be initialized. Please make sure you are on the right network',
      );
    }
  };

  const handleEscrowContract = () => {
    try {
      const abi = getTokenEscrowAbi<JsonFragment>();
      const currentContract = new ethers.Contract(
        escrowAddress,
        abi,
        provider,
      ) as TokenEscrow;
      setEscrowContract(currentContract);
    } catch (error) {
      console.info(
        'Escrow Contract cannot be initialized. Please make sure you are on the right network',
      );
    }
  };

  const handleTokenContract = () => {
    try {
      const currentContract = new ethers.Contract(
        paidTokenAddress,
        PaidTokenContract.abi,
        provider,
      );
      setTokenContract(currentContract);
    } catch (error) {
      console.info(
        'Token Contract cannot be initialized. Please make sure you are on the right network',
      );
    }
  };

  const handleTokenSignerContract = () => {
    try {
      const signer = provider.getSigner(account);
      const currentContract = new ethers.Contract(
        paidTokenAddress,
        PaidTokenContract.abi,
        signer,
      );
      setTokenSignerContract(currentContract);
    } catch (error) {
      console.info(
        'Signer Contract cannot be initialized. Please make sure you are on the right network',
      );
    }
  };

  useEffect(() => {
    const network = ethers.providers.getNetwork(chainId);
    setNetworkName(network?.name ?? '');
  }, [chainId]);

  useEffect(() => {
    if (account && (account !== currentWallet)) {
      handleContract();
      handleContractSigner();
      handleEscrowContract();
      handleTokenContract();
      handleTokenSignerContract();
    }
  }, [account]); // ensures that effect its in only change wallet state of root

  useEffect(() => {
    handleContract();
    handleContractSigner();
    handleEscrowContract();
    handleTokenContract();
    handleTokenSignerContract();
  }, []); // Empty array ensures that effect is only run on mount in every page

  return {
    contract,
    contractSigner,
    escrowContract,
    tokenContract,
    tokenSignerContract,
    networkName,
  };
}

export default useContract;
