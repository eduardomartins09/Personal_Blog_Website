import prisma from '../lib/prismadb'

export default async function getCommentByBlogId( blogId?: string ) {
    try {
        const totalCount = await prisma.comment.count({
            where: {
                blogId: blogId
            }, 
        })

        const comments = await prisma.comment.findMany({
            where: {
                blogId: blogId
            }, 
            orderBy: {
                createdAt: 'desc',
            },
        })

        const safeComment = comments.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
        }))

        return {
            totalCount,
            safeComment,
        }

    } catch {
        throw new Error('Failed to get comments!')
    }
}