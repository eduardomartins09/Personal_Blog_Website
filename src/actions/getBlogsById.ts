import prisma from '../lib/prismadb'

export default async function getBlogsById(id: string) {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: id
            }, 
            include: {
                user: true
            }
        })

        if (!blog) {
            return null 
        }

        return {
            ...blog,
            createdAt: blog.createdAt.toString(),
            user: {
                ...blog.user,
                createdAt: blog.user.createdAt.toString(),
                updatedAt: blog.user.updatedAt.toString(),
                emailVerified: blog.user.emailVerified?.toString() || null,
            }
        }
    } catch {
        throw new Error('Failed to get blogs by id!')
    }
}