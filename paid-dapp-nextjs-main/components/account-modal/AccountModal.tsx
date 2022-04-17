import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PdModal, PdModalBody } from '@/pdComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from 'react-binance-wallet';
import ProfileModel from '@/models/profileModel';
import { setCurrentWallet } from '../../redux/actions/wallet';
import { doSetProfile } from '../../redux/actions/profile';
import helper from '../../utils/helper';
import FormAccount from './FormAccount';

interface AccountModalProps {
  open: boolean;
}

const AccountModal: FC<AccountModalProps> = ({
  open,
}: AccountModalProps) => {
  const dispatch = useDispatch();
  const { account, chainId } = useWallet();
  const router = useRouter();
  const { query } = useRouter();

  const profileReducer = useSelector(
    (state: any) => state.profileReducer,
  );

  const onSubmit = (values: ProfileModel) => {
    if (!profileReducer.user.profile) {
      dispatch(doSetProfile(values));
    }

    if (account) {
      const getWalletProfile = profileReducer.user.walletAddresses.find(
        (wallet) => wallet.address == account,
      )
      if (!getWalletProfile) {
        helper.getNetworkEnumByChainId(chainId).then((networkEnum) => {
          dispatch(setCurrentWallet(account, networkEnum, router, query))
        })
      }
    }
  };

  return (
    <PdModal isOpen={open} id="account-modal-content">
      <PdModalBody className="account-pd-modal">
        <h1>Create your PAID account</h1>
        <p>Create your DID account to start using PAID Smart Agreements</p>
        <FormAccount setProfile={onSubmit} />
      </PdModalBody>
    </PdModal>
  );
};

export default AccountModal;
