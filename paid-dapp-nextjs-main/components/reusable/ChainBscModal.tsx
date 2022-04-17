
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './ProgressModal.module.scss'
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux'

const BSC_METAMASK_URL = "https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain";

export function ChainBscModal() {
  const validChains = [97]
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const walletReducer = useSelector<any, any>((state) => state.walletReducer)

  useEffect(() => {
    setOpenInfoModal(!validChains.includes(walletReducer.chainId))
  }, [walletReducer.chainId])


  const boxStyles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openInfoModal}
    >
      <Fragment>
        <Box sx={boxStyles}>
          <p className={styles.message}> The PAID dapp Standard Agreements are currently available only on Binance Smart Chain Testnet. Please switch network in Metamask to Binance Smart Chain Testnet.
            Click <a href={BSC_METAMASK_URL} target="_blank">"here"</a> for instructions how to connect Metamask to Binance Smart Chain.</p>
        </Box>
      </Fragment>
    </Modal >
  )
}