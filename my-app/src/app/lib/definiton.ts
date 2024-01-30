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

export type User = {
  name: string
  surname: string
  email: string
  password: string
  country: string
  image: string
}

export type UserProps = {
  user: User
}
