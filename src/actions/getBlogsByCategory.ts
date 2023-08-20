import prisma from '../lib/prismadb'

export default async function getBlogsByCategory(categoryName: string, page: number, limit: number) {
    try {
        const totalCount = await prisma.blog.count({
            where: {
                categoryName: {
                    contains: categoryName,                
                },
            },
        })

        const blogs = await prisma.blog.findMany({
            where: {
                categoryName: {
                    contains: categoryName,                
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * limit,
            take: limit,
        })

        const safeBlogs = blogs.map((blog) => ({
            ...blog,
            createdAt: blog.createdAt.toISOString(),
        }))

        return {
            totalCount,
            safeBlogs,
        }

    } catch {
        throw new Error('Failed to get blogs by category!')
    }
}

