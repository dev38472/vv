import ProfileCard from '@/components/reusable/ProfileCard';
import ProfileMenu from './ProfileMenu';
import SocialMedia from '@/components/reusable/SocialMedia';
import useContract from '@/hooks/useContract';
import setOpenMenu from '@/redux/actions/menu';
import { doDisconnect } from '@/redux/actions/wallet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FC, useEffect, useState } from 'react';
import { useWallet } from 'react-binance-wallet';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'reactstrap';
import { AddressItem } from './AddressItem';

type SideBarProps = {
  routerName: string
}

const sideBarItems = [
  {
    link: '/agreements',
    icon: 'standardAgreements.png',
    iconSelected: 'standardAgreements_selected.png',
    title: 'Standard Agreements',
  },
  {
    link: '/smart_agreements',
    icon: 'smartAgreement.png',
    iconSelected: 'smartAgreement_selected.png',
    title: 'SMART Agreements',
  },
  {
    link: '/binance_chain',
    icon: 'binanceSmartChain.png',
    iconSelected: 'binanceSmartChain_selected.png',
    title: 'BSC Bridge',
  },
  {
    link: '/buy-paid',
    icon: 'buyPaid.png',
    iconSelected: 'buyPaid_selected.png',
    title: 'Buy PAID',
  },
  {
    link: '/launchpads',
    icon: 'launchpads.png',
    iconSelected: 'launchpads_selected.png',
    title: 'Launchpads',
  },
  {
    link: '/staking',
    icon: 'staking.png',
    iconSelected: 'staking_selected.png',
    title: 'Staking',
  },
];

const SideBar: FC<SideBarProps> = ({ routerName }) => {
  const { tokenContract, networkName } = useContract();
  const {
    balance, connector, account, reset,
  } = useWallet();
  const [paidToken, setPaidToken] = useState(0);
  const [symbolToken, setSymbolToken] = useState<string>('ETH');
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const walletReducer = useSelector(
    (state: { walletReducer: any }) => state.walletReducer,
  );
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const router = useRouter()


  const resetWallet = () => {
    reset()
    dispatch(doDisconnect())
  }

  const logout = () => {
    global.localStorage.clear()
    dispatch({ type: 'USER_LOG_OUT' })
    reset()
    router.push('/')
  }

  const setSymbolWallet = (chainId: number) => {
    if ([56, 97].includes(chainId)) {
      setSymbolToken('BNB')
    } else {
      setSymbolToken('ETH')
    }
  }

  useEffect(() => {
    setSymbolWallet(walletReducer.chainId)
  }, [walletReducer]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenBalance = await tokenContract.balanceOf(walletReducer.currentWallet);
        setPaidToken(tokenBalance.toString() / 1e18);
      } catch (error) {
        setPaidToken(0);
      }
    };

    if (tokenContract) getToken();
  }, [tokenContract]);

  return (
    <Navbar
      className={`sidebar ${isOpen ? '' : 'collapse'}`}
      color="primary"
      light
    >
      <div className="logos mt-4">
        <img
          className="logo"
          src={`/assets/images/${isOpen ? 'logo.svg' : 'logoSmall.svg'}`}
          alt=""
        />
        <button
          type="button"
          className="btn-collapse"
          onClick={() => {
            dispatch(setOpenMenu(!isOpen));
          }}
        >
          <img
            src={`/assets/icon/${isOpen ? 'collapse_out.svg' : 'collapse_in.svg'}`}
            alt=""
          />
        </button>
      </div>

      {
        isOpen && <SocialMedia />
      }
      <div className="menu">
        {
          sideBarItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className={`menu-item ${routerName === item.link ? 'active' : ''}`}>
                <img src={`/assets/icon/${routerName === item.link ? item.iconSelected : item.icon}`} alt="" />
                {isOpen ? item.title : ''}
              </div>
            </Link>
          ))
        }
      </div>
      <hr />

      {account && (
        <div className="menu">
          {isOpen && <p>Wallet</p>}
          <li className="menu-item">
            <img src="/assets/icon/paid.png" alt="" />
            {isOpen && (
              <div>
                <span>
                  {paidToken.toFixed(4)}
                  &nbsp;PAID
                </span>
                <br />
                <span>
                  {((balance as any) / 1e18).toFixed(4)}
                  &nbsp;
                  {symbolToken}
                </span>
              </div>
            )}

          </li>

          <AddressItem
            account={account}
            isOpen={isOpen}
            networkName={networkName}
            onDisconnect={resetWallet}
          />
        </div>
      )}

      <div className="menu-bottom">
        <ProfileMenu
          profile={profile} selected={routerName === '/profile'}
          onEditSelected={(dest) => { router.push(dest) }}
          onLogout={() => { logout() }}
        />
      </div>
    </Navbar>
  )
}

SideBar.propTypes = {
  routerName: PropTypes.string.isRequired,
}

export default SideBar
