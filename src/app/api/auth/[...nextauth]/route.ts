import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from '../../../../lib/prismadb'

import { SafeUser } from '@/types'

export const authOptions:AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: { 
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                const isCorrect = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrect) {
                    throw new Error('Invalid credentials')
                }

                return user
            }
        }) 
    ],
    callbacks: {
        async session({ session, token }) {   
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role || 'User',
                    name: token.name
                },
            }      
        },
        async jwt({ token, user, session, trigger }) {
            if (trigger === 'update' && session?.name) {
                token.name = session.name
                token.picture = session.image
            }
            
            if (user) { 
                const userWithRole = user as SafeUser

                return {
                    ...token,
                    id: userWithRole.id,
                    role: userWithRole.role
                }
            }

            // update in the database 
            const newUser = await prisma.user.update({
                where: {
                    id: token.id as string | undefined,
                },
                data: {
                    name: token.name,
                    image: token.picture
                }
            })
            
            return token
        }
    },
    pages: {
        signIn: '/auth/login',        
        error: '/errors'
    },  
    session: {
        strategy: "jwt",        
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions) 
export { handler as GET, handler as POST }
