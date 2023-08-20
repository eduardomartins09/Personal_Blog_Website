import { getServerSession } from "next-auth"

import { authOptions } from "../app/api/auth/[...nextauth]/route" 
import prisma from '../lib/prismadb'

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            throw new Error('Where is your email ?')
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            throw new Error('User not found!')
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }

    } catch {
        throw new Error('Failed to get user!')
    }
}