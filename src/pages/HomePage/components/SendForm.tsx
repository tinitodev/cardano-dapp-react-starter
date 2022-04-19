import { useState, useContext } from 'react'
import {
  Input,
  Box,
  InputLabel,
  CircularProgress,
  Typography,
  Link,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { makeStyles } from '@mui/styles'

import {
  CARDANO_EXPLORER_TESTNET,
  SCRIPT_ADDRESS_TESTNET,
} from '../../../config/constants'
import { WalletAPIContext } from '../../../context/WalletAPI/WalletAPIContext'
import { buildSendAdaToPlutusScript } from '../../../utils/transactions/transactionsUtils'
import { TxSendError, TxSignError } from '../../../types/models'
import WarningDialog from '../../../app/components/alerts/WarningDialog'
import TxErrorDialog from '../../../app/components/alerts/TxErrorDialog'

const useStyles = makeStyles(() => ({
  container: {
    padding: '40px',
  },
}))

const SendForm = () => {
  const classes = useStyles()

  const [amountInADA, setAmountInADA] = useState('')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const [errorDialog, setErrorDialog] = useState<{
    open: boolean
    txError?: TxSendError | TxSignError
  }>({ open: false, txError: undefined })

  const { walletAPI, address } = useContext(WalletAPIContext)

  const handleWarningDialogClose = (yes: boolean) => {
    if (yes) {
      handleSend()
    }
    setDialogOpen(false)
  }

  const handeErrorDialogClose = () => {
    setErrorDialog({ open: false, txError: undefined })
  }

  const handleSend = async () => {
    setLoading(true)
    setTxHash('')
    //console.log(`Sending ${amountInADA} $ADA...`)

    const lovelace = parseInt(amountInADA) * 1000000
    const txResponse = await buildSendAdaToPlutusScript(
      walletAPI!,
      address,
      SCRIPT_ADDRESS_TESTNET,
      lovelace.toString()
    )
    if (txResponse.hasOwnProperty('code')) {
      const _txError = txResponse as TxSendError | TxSignError
      setErrorDialog({ open: true, txError: _txError })
    } else {
      setTxHash(txResponse as string)
    }
    setAmountInADA('')
    setLoading(false)
  }

  return (
    <Box className={classes.container}>
      <InputLabel>Input the amount of $ADA you want to Send:</InputLabel>
      <Input
        value={amountInADA}
        onChange={(e) => setAmountInADA(e.target.value)}
        type="number"
        inputProps={{
          min: 1,
          step: 1,
        }}
        style={{ width: '150px', margin: '20px' }}
      />
      <LoadingButton
        loading={loading}
        onClick={() => setDialogOpen(true)}
        loadingIndicator={<CircularProgress color="warning" size={55} />}
        style={{ fontSize: '32px' }}
      >
        Send
      </LoadingButton>
      {txHash && (
        <Box>
          <Typography variant="body1">
            Transaction Submitted. TxHash: {txHash}
          </Typography>
          <Typography variant="body2">
            You can check it out at cardano explorer (wait a few seconds for the
            tx to appear)
            <Link
              href={`${CARDANO_EXPLORER_TESTNET}${txHash}`}
              target="_blank"
              rel="noreferrer"
              style={{ margin: '10px' }}
            >
              View in explorer
            </Link>
          </Typography>
        </Box>
      )}
      <WarningDialog open={dialogOpen} handleClose={handleWarningDialogClose} />
      <TxErrorDialog
        open={errorDialog.open}
        text={errorDialog.txError?.info ?? ''}
        handleClose={handeErrorDialogClose}
      />
    </Box>
  )
}

export default SendForm
