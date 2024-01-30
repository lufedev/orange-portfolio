import { Alert, Snackbar } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { TypeSnackBar } from '../lib/definiton'

export default function CustomSnackbar({
  handleClose,
  state,
  text,
  severity
}: TypeSnackBar) {
  return (
    <Snackbar
      className="static translate-x-0"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={state}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />
        }}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
