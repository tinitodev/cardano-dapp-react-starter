import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface TxErrorDialogProps {
  open: boolean
  text: string
  handleClose: () => void
}

const TxErrorDialog = ({ open, text, handleClose }: TxErrorDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="tx-error-dialog-title"
        aria-describedby="tx-error-dialog-description"
      >
        <DialogTitle id="tx-error-dialog-title">
          Something went wrong..
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="tx-error-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TxErrorDialog
