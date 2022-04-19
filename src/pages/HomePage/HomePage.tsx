import { useContext, useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'

import WalletSelectionModal from './components/WalletSelectionModal'
import MainnetNotSupportedAlert from '../../app/components/alerts/MainnetNotSupportedAlert'
import { WalletAPIContext } from '../../context/WalletAPI/WalletAPIContext'
import AddressDisplay from './components/AddressDisplay'
import SendForm from './components/SendForm'

const useStyles = makeStyles((theme: Theme) => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '40px',

    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  bonfireImage: {
    width: '200px',
    height: '200px',
    margin: '20px',
  },
  secondImg: {
    [theme.breakpoints.down('tablet')]: {
      display: 'none',
    },
  },
}))

export const HomePage = () => {
  const classes = useStyles()
  const { address, isMainnet } = useContext(WalletAPIContext)
  const [showMainnetAlert, setShowMainnetAlert] = useState(false)

  useEffect(() => {
    if (isMainnet) {
      setShowMainnetAlert(true)
    }
  }, [isMainnet])

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{ typography: { mobile: 'h6', tablet: 'h4', desktop: 'h3' } }}
          >
            Home Page
          </Typography>
          <WalletSelectionModal />
        </Box>
      </Box>
      {address && (
        <>
          <AddressDisplay />
          <SendForm />
        </>
      )}
      {isMainnet && (
        <MainnetNotSupportedAlert
          open={showMainnetAlert}
          handleClose={() => setShowMainnetAlert(false)}
        />
      )}
    </Box>
  )
}
