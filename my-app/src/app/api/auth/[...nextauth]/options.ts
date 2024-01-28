import type { NextAuthOptions } from 'next-auth'
import { getEmail } from '../../user/user'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

//http://localhost:3000/api/auth/signin <- PRECISA SER MUDADO PARA A TELA A SER CONSTRUIDA
export const options: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'user@gmail.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials: any) {
        // Fazer conexão com o BD aqui
        //next-auth.js.org/configuration/providers/credentials

        // RECEBENDO USUÁRIOS DO BANCO DE DADOS
        //Falta como saber se o usuário existe no banco de dados
        try {
          const user = await getEmail(credentials?.email as string)
          if (user === null) {
            return null
          }
          return (
            bcrypt
              .compare(credentials?.password, user.password)
              //Aviso de erro, não sei como resolver ainda
              .then((match) => {
                if (!match) {
                  throw new Error('Senha incorreta')
                } else {
                  return user
                }
              })
          )
        } catch (error) {
          throw new Error('Email não encontrado')
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
}
