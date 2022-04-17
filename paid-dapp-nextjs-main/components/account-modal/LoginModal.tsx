import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from 'react-binance-wallet';
import { PdModal, PdModalBody } from '@/pdComponents';

import ProfileModel from '@/models/profileModel';
import { setCurrentWallet } from '../../redux/actions/wallet';
import { doSetProfile, doSetLoginMagicLink, getProfileFromBearer } from '../../redux/actions/profile';
import helper from '../../utils/helper';
import FormLogin from './FormLogin';
import styles from './LoginModal.module.scss';


interface AccountModalProps {
  open: boolean;
  onLogin: any;
}

const createMagic = (key) => typeof window !== 'undefined' && new Magic(key);
const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);

const LoginModal: FC<AccountModalProps> = ({ open, onLogin }: AccountModalProps) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const [profile, setProfile] = useState<ProfileModel>({});
  const [disabledLogin, setDisabledLogin] = useState(false)
  const router = useRouter();
  const { query } = useRouter();
  const { formatDateProfile } = helper;

  const login = async (values: ProfileModel) => {
    try {
      setDisabledLogin(true)
      const didToken = await magic.auth.loginWithMagicLink({
        email: values.email,
      });

      const resLogin = await dispatch(doSetLoginMagicLink(didToken, values.email));
      if (resLogin) {
        setDisabledLogin(false)
        
        if (resLogin['profile']) {
          let userProfile: ProfileModel = {
            email: resLogin['email'],
            did: resLogin['did'],
            lastLoginAt: resLogin['lastLoginAt'],
            createdAt: resLogin['createdAt'],
            updatedAt: resLogin['updatedAt'],
            firstName: resLogin['profile']['firstName'],
            lastName: resLogin['profile']['lastName'],
            streetAddress: resLogin['profile']['streetAddress'],
            profileName: resLogin['profile']['profileName'],
          };
  
          dispatch(doSetProfile(userProfile));
        }

        onLogin()
      }
    } catch (err) {
      setDisabledLogin(false)
      console.log(err);
    }
  };

  return (
    <PdModal isOpen={open} id={styles.loginModalContent}>
      <PdModalBody className={styles.loginPdModal}>
        <h1>
          Welcome to
          <br />
          PAID SMART Agreements
        </h1>
        <p>
          Enter your email and we&apos;ll send you a link
          <br />
          that will sign you in
        </p>
        <FormLogin login={login} disabledLogin={disabledLogin} />
      </PdModalBody>
    </PdModal >
  );
};

export default LoginModal;
