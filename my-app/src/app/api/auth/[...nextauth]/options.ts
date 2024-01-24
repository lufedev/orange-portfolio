import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { 
					label: "Username", 
					type: "text", 
					placeholder: "User" 
				},
				password: { 
					label: "Password", 
					type: "password" ,
					placeholder: "Password"
				}
			},
			async authorize(credentials) {
				// Fazer conexão com o BD aqui
				//next-auth.js.org/configuration/providers/credentials
				const user = {id: "1", name: "teste", password: "123"}

				if(credentials?.username === user.name && credentials?.password === user.password) {
					return user
				} else {
					return null
				}
			}
		}
		)
	],

}