import { useContext } from 'react'
import { AppBar, Box, Toolbar, Typography, Chip } from '@mui/material'
import { Link } from 'react-router-dom'

import { WalletAPIContext } from '../../context/WalletAPI/WalletAPIContext'
import { NetworkId } from '../../types/models'
import WalletIcon from './WalletIcon'

const NavBar = () => {
  const { address, networkId } = useContext(WalletAPIContext)

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              My Project
            </Link>
          </Typography>
          {networkId !== undefined && (
            <Chip
              label={networkId == NetworkId.Mainnet ? 'Mainnet' : 'Testnet'}
              color="primary"
              style={{ marginRight: '15px' }}
            />
          )}
          {address && (
            <>
              <Typography variant="body2">Connected With </Typography>
              <Box style={{ height: '100%' }}>
                <WalletIcon />
              </Box>
            </>
          )}
          <Typography variant="h6" component="div">
            <Link
              to="/other"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                marginLeft: '20px',
              }}
            >
              Other Page
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
