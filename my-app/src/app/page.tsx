import CustomButton from './components/CustomButton'

export default function Home() {
  return (
    <div>
      <CustomButton theme={true} variant="contained" color="primary" size="large" disabled={false} name="LABEL" />
    </div>
  )
}
