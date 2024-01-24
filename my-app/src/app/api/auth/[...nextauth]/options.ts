import type { NextAuthOptions } from 'next-auth'
import { sql } 
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
          label: 'Username',
          type: 'text',
          placeholder: 'User'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        // Fazer conexão com o BD aqui
        //next-auth.js.org/configuration/providers/credentials

        const userList = await getUsers()

        // RECEBENDO USUÁRIOS DO BANCO DE DADOS
        //Falta como saber se o usuário existe no banco de dados
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user
        } else {
          return null
        }
      }
    })
  ]
}

const getUsers = async () => {
  interface User {
    username: string;
    password: string;
  }
  interface RowItem {
    row: string;
  }
  
  const users = await sql`SELECT (name, password) FROM users`;
  const userList: User[] = users.rows.map((item: RowItem) => {
    const [, username, password] = item.row.match(/"([^"]+)",([^)]+)/) || [];
    return {
      username: username || "unknown",
      password: password || "unknown"
    };
  });
}