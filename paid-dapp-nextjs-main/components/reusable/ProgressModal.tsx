import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from './ProgressModal.module.scss'
import { useSelector } from 'react-redux'

interface ProgressModalProps {
  message?: string
  open: boolean
  close(): void
}

export function ProgressModal({
  message,
  open,
  close
}: ProgressModalProps) {
  const provider = useSelector<any, any>((state) => state.walletReducer.provider)

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
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          close()
        }
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={boxStyles}>
          <img src="/assets/icon/progress.png" alt="Loading..." className={styles.rotate} />
          {(message == null) ? (<p className={styles.message}>Please confirm the transaction in {(provider !== "meta") ? ('Binance') : ('Metamask')} Wallet.</p>) : (<p className={styles.message}>{message}</p>)}
        </Box>
      </Fade>
    </Modal>
  )
}