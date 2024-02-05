import { Alert, Snackbar } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { TypeSnackBar } from '../lib/definiton'

export default function CustomSnackbar({
  handleClose,
  state,
  text,
  severity
}: TypeSnackBar) {
  const validSeverity = severity as 'success' | 'error' | 'warning' | 'info'
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={state}
      onClose={handleClose}
      className="absolute left-6 right-6 top-[49px] md:relative md:left-1/2 md:translate-x-[-50%] md:top-[109px] md:w-80"
    >
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />
        }}
        severity={validSeverity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
