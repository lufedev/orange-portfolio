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
  project?: Project
  onClick?: () => void
  view?: boolean
}

export type Project = {
  id?: number
  title: string
  tags: string[]
  link: string
  description: string
  urlImage: string
  date: string
}

export type ProjectProps = {
  user?: User
  project?: Project
  onClick?: () => void
  onClose?: () => void
  onUpdateProject?: (project: Project) => void;
  onCreateProject?: (project: Project) => void; 
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


export type TypeChip = {
  variant: string
  color: string
  size: string
  disabled: boolean
  className: string
  label: string
  onDelete?: () => void; 
}
