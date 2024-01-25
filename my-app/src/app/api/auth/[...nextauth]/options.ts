import type { NextAuthOptions } from 'next-auth'
import { getEmail } from '../../user/user'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

//http://localhost:3000/api/auth/signin <- PRECISA SER MUDADO PARA A TELA A SER CONSTRUIDA
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
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
          const user = await getEmail(credentials?.username as string)
          if (user === null) {
            return null
          }
          return (
            bcrypt
              .compare(credentials?.password, user.password)
              //Aviso de erro, não sei como resolver ainda
              .then((match) => {
                if (!match) {
                  console.log('SENHA INVALIDA ')
                  return null
                } else {
                  return user
                }
              })
          )
        } catch (error) {
          if (error instanceof Error) {
            console.log('ERRO DESCONHECIDO')
            return null
          }
        }
      }
    })
  ]
}
