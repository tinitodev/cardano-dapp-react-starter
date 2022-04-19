import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useContext } from 'react'

import { SCRIPT_ADDRESS_TESTNET } from '../../../config/constants'
import { WalletAPIContext } from '../../../context/WalletAPI/WalletAPIContext'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid gray',
    minHeight: '80px',
    padding: '10px',
    wordBreak: 'break-all',
  },
}))

const AddressDisplay = () => {
  const classes = useStyles()
  const { address } = useContext(WalletAPIContext)

  return (
    <Box className={classes.container}>
      <Typography variant="h6">Your wallet address:</Typography>
      {address && <Typography variant="body1">{address}</Typography>}

      <Typography variant="h6">Contract/script address:</Typography>
      {SCRIPT_ADDRESS_TESTNET}
    </Box>
  )
}

export default AddressDisplay
