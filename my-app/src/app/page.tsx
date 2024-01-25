import Header from "./components/header";
import CustomButton from './components/CustomButton'

export default function Home() {
  return (
    <div>
      <Header/>
      <CustomButton
        variant="contained"
        color="primary"
        size="large"
        name="LABEL"
      />
    </div>
  )
}