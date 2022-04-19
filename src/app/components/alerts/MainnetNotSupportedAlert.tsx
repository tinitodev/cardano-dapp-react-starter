import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface MainnetNotSupportedAlertProps {
  open: boolean
  handleClose: () => void
}

const MainnetNotSupportedAlert = ({
  open,
  handleClose,
}: MainnetNotSupportedAlertProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="is-mainnet-dialog-title"
        aria-describedby="is-mainnet-dialog-description"
      >
        <DialogTitle id="is-mainnet-dialog-title">Uuuups..</DialogTitle>
        <DialogContent>
          <DialogContentText id="is-mainnet-dialog-description">
            Mainnet is currently disabled. You can try this Dapp only with a
            Testnet wallet for now. You can refresh the page and choose again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MainnetNotSupportedAlert
