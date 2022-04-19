import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface WarningDialogProps {
  open: boolean
  handleClose: (yes: boolean) => void
}

const WarningDialog = ({ open, handleClose }: WarningDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="warning-dialog-title"
        aria-describedby="warning-dialog-description"
      >
        <DialogTitle id="warning-dialog-title">
          You are about to SEND your $ADA
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="warning-dialog-description">
            Are you sure you want to proceed..!?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)}>Yes, Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default WarningDialog
