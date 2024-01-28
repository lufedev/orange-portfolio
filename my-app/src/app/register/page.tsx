import RegisterForm from '../components/RegisterForm'

export default function Register() {
  return (
    <div className="flex flex-col justify-center h-lvh">
      <h5 className="h5 text-color-principal-90 text-center mb-8">
        Cadastre-se
      </h5>
      <div className="px-6">
        <RegisterForm />
      </div>
    </div>
  )
}
