import Input from './components/Input'
import LoginInput from './components/LoginInput'
import SuccessModel from './components/SuccessModal';
import Header from "./components/header";

export default function Home() {
  return (
    <div>
      <Header/>
      <LoginInput />
      {/* <Input/> */}
      {/* <SuccessModel status={false}  titulo="Edição concluída com sucesso!"/> */}
      
    </div>
  )
}