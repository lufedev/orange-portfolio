export type TypeButton = {
  onClick?: () => void
  theme: string
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

export type User = {
  id?: number
  name: string
  surname: string
  email: string
  password: string
  country: string
  image: string
  projects: Project[]
}

export type UserProps = {
  user: User
  onClick?: () => void
}

export type Project = {
  id?: number
  title: string
  tags: string[]
  link: string
  description: string
  urlImage: string
}

export type ProjectProps = {
  project?: Project
  onClick?: () => void
  onClose?: () => void
  states?: boolean
}

export type TypeSnackbarInfo = {
  status: boolean
  message: string
  severity: string
}

export type FormProps = {
  onSnackbarUpdate: (snackbarInfo: TypeSnackbarInfo) => void
}
