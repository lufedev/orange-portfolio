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
  sname: string
  email: string
  password: string
  country: string
  image: string
  projects: Project[]
}
export type Session = {
  sessionData: {
    name: string
    email: string
  }
}
export type UserProps = {
  user: User
  project?: Project
  onClick?: () => void
  view?: boolean
  filter?: string
  editable?: boolean
}

export type Project = {
  id?: number
  title: string
  tags: string
  link: string
  description: string
  imagepath: string
  date: string
}

export type ProjectProps = {
  user?: User
  project?: Project
  onClick?: () => void
  onClose?: () => void
  states?: boolean
  editing: boolean
}

export type TypeSnackbarInfo = {
  status: boolean
  message: string
  severity: string
}

export type FormProps = {
  onSnackbarUpdate: (snackbarInfo: TypeSnackbarInfo) => void
}

export type TypeChip = {
  variant: string
  color: string
  size: string
  disabled: boolean
  className: string
  label: string
  onDelete?: () => void
}

export type TypeModal = {
  status: boolean
  title: string
  onClick?: () => void
}
