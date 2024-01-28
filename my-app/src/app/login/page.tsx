import GoogleLogin from '../components/GoogleLogin'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <div className="flex flex-col justify-center h-lvh">
      <h5 className="h5 text-color-principal-90 text-center mb-8">
        Entre no Orange Portfólio
      </h5>
      <GoogleLogin />
      <div className="px-6">
        <LoginForm />
      </div>
    </div>
  )
}
