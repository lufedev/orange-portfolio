'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import RenderGoogle from './RenderGoogle'

export default function GoogleLoginButton({ className }: any) {
  const ClientId =
    '246885474721-45d51ac88psutifbi0mnf7ssqv7j3tpb.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <RenderGoogle className={className}></RenderGoogle>
    </GoogleOAuthProvider>
  )
}
