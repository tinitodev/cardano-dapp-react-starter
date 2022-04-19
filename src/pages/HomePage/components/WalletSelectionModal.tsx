import { useContext, useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'

import { WalletAPIContext } from '../../../context/WalletAPI/WalletAPIContext'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const WalletSelectionModal = () => {
  const { cardano } = window
  const { selectWallet, selectedWallet, walletAPI } =
    useContext(WalletAPIContext)
  const [walletSelectionModal, setWalletSelectionModal] = useState(false)

  if (selectedWallet && walletAPI) return null

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        style={{ width: '220px', margin: '20px' }}
        onClick={() => setWalletSelectionModal(true)}
      >
        Connect Wallet
      </Button>

      <Modal
        open={walletSelectionModal}
        onClose={() => setWalletSelectionModal(false)}
      >
        <Box sx={modalStyle}>
          {!!(cardano?.nami || cardano?.flint || cardano?.eternl) && (
            <Typography variant="h6" component="h2">
              Choose a Wallet
            </Typography>
          )}
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            {cardano?.nami && (
              <Button
                variant="outlined"
                style={{ width: '160px', margin: '10px' }}
                onClick={() => selectWallet('Nami')}
              >
                <img
                  src={cardano.nami.icon}
                  alt=""
                  height="25px"
                  style={{ marginRight: '10px' }}
                />{' '}
                Nami
              </Button>
            )}
            {cardano?.flint && (
              <Button
                variant="outlined"
                style={{ width: '160px', margin: '10px' }}
                onClick={() => selectWallet('Flint')}
              >
                <img
                  src={cardano.flint.icon}
                  alt=""
                  height="25px"
                  style={{ marginRight: '10px' }}
                />{' '}
                Flint
              </Button>
            )}
            {cardano?.eternl && (
              <Button
                variant="outlined"
                style={{ width: '160px', margin: '10px' }}
                onClick={() => selectWallet('Eternl')}
              >
                <img
                  src={cardano.eternl.icon}
                  alt=""
                  height="25px"
                  style={{ marginRight: '10px' }}
                />{' '}
                Eternl
              </Button>
            )}
            {!(cardano?.nami || cardano?.flint || cardano?.eternl) && (
              <Typography variant="body1">
                NO WALLETS FOUND: Please install one of the following: Nami,
                Flint or Eternl
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default WalletSelectionModal
