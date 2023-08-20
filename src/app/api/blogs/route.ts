import { NextResponse } from 'next/server'
import prisma from '../../../lib/prismadb'

import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ error: "User doesn't exists!" }, { status: 409 })
        }

        const body = await req.json()

        const { name, description, imageSrc, categoryName } = body
        
        let category = await prisma.category.findFirst({
            where: { name: categoryName },
        })

        if (!category) {
            category = await prisma.category.create({
                data: {
                name: categoryName,
            },
        })
        }

        const blog = await prisma.blog.create({
            data: {
                name,
                imageSrc,
                description,
                user: {
                    connect: { id: currentUser.id }, 
                },
                categoryName   
            },
        })
    
        return NextResponse.json(blog)
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 400 })
    }

}
