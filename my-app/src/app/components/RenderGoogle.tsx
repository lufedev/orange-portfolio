import { useGoogleLogin } from '@react-oauth/google'

export default function RenderGoogle({ className }: any) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse)
  })

  return (
    <button onClick={() => login()} className={className}>
      Entrar com Google
    </button>
  )
}
