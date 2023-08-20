import prisma from '../lib/prismadb'

export default async function getBlogsByName(informedDescription: string, page: number, limit: number) {
    try {
        const totalCount = await prisma.blog.count({
            where: {
                name: {
                    contains: informedDescription
                },
            },
        })

        const blogs = await prisma.blog.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: informedDescription.slice(1) || informedDescription.toLowerCase()
                            
                        }
                    },
                    {
                        AND: {
                            name: {
                                contains: informedDescription.charAt(0).toUpperCase()
                            }
                        }
                    }
                ],
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
        throw new Error('Failed to get blogs by name!')
    }
}

