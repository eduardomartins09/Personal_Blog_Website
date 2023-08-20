import { NextResponse } from "next/server"
import getCurrentUser from "@/actions/getCurrentUser"
import prisma from '../../../../lib/prismadb'

interface IParams {
    blogId?: string
}

export async function DELETE( request: Request, {params}: {params: IParams} ) {
    try {
        const currentUser = await getCurrentUser()
    
        if (!currentUser) {
            return NextResponse.json({ error: "User doesn't exists!" }, { status: 409 })
        }
    
        const { blogId } = params
    
        if (!blogId || typeof blogId !== 'string') {
            return NextResponse.json({ error: "Invalid Id!" }, { status: 409 })
        }
    
        const blog = await prisma.blog.deleteMany({
            where: {
                id: blogId,
                userId: currentUser.id
            }
        })
    
        return NextResponse.json(blog)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}

export async function PUT( request: Request, {params}: {params: IParams} ) {
    try {
        const currentUser = await getCurrentUser()
        const json = await request.json()
    
        if (!currentUser) {
            return NextResponse.json({ error: "User doesn't exists!" }, { status: 409 })
        }
    
        const { blogId } = params
    
        if (!blogId || typeof blogId !== 'string') {
            throw new Error('Invalid Id')
        }
    
        const updated = await prisma.blog.update({
            where: {
                id: blogId
            },
            data: json
        })
    
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}