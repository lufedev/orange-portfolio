import RegisterForm from '../components/RegisterForm'
import Image from 'next/image'
import imgRegister from '../assets/img/img-cadastro.svg'

export default function Register() {
  return (
    <div className="flex items-center justify-between h-screen">
      <Image
        src={imgRegister}
        alt=""
        className="hidden md:block relative bottom-0 left-0 h-full w-auto"
      />
      <div className="px-6 w-full md:pr-[8.44rem] md:pl-[4.94rem]">
        <h5 className="h5 text-color-principal-90 text-center mb-8 md:h3">
          Cadastre-se
        </h5>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
