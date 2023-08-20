import prisma from '../lib/prismadb'

export default async function getCategories() {
    try {
        const totalCountOfCategories = await prisma.category.count()

        const categories = await prisma.category.findMany({ })

        const safeBlogs = categories.map((blog) => ({
            ...blog,
        }))

        return {
            totalCountOfCategories,
            categories,
        }

    } catch {
        throw new Error('Failed to get categories!')
    }
}
