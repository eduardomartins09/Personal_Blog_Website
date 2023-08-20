import prisma from '../lib/prismadb'

export default async function getBlogs(page: number, limit: number) {
    try {
        const totalCount = await prisma.blog.count()

        const blogs = await prisma.blog.findMany({
            orderBy: {
              createdAt: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit,
        })

        const safeBlogs = blogs.map((blog) => ({
            ...blog,
            createdAt: blog.createdAt.toISOString()
        }))

        return {
            totalCount,
            safeBlogs,
        }

    } catch {
        throw new Error('Failed to get all blogs!')
    }
}
