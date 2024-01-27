import GoogleLoginButton from '../components/GoogleLoginButton'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <div className="flex flex-col justify-center h-lvh">
      <div className="px-6 flex flex-col">
        <h5 className="h5 text-color-principal-90 text-center mb-8">
          Entre no Orange Portfólio
        </h5>
        <GoogleLoginButton className="mb-8" />
        <LoginForm />
      </div>
    </div>
  )
}
