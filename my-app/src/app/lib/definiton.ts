export type TypeButton = {
  onClick?: () => void
  theme: boolean
  variant: string
  color: string
  size: string
  disabled: boolean
  loading: boolean
  name: string
}

export type TypeSnackBar = {
  handleClose?: () => void
  state: boolean
  text: string
  severity: string
}
