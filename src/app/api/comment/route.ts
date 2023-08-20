import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prisma from '../../../lib/prismadb'

export async function POST( request: Request ) {
    try {
        const body = await request.json()
    
        const {
            text,
            id, 
            name,
            image,
            blogId,
        } = body
    
        if (!text || !id || !image || !blogId) {
            return NextResponse.json({ error: 'Missing text or something else!' }, { status: 400 })
        }
    
        const existingUser = await prisma.user.findMany({
            where: {
              id: body.id
            },
        })
        
        if (!existingUser) {
            return NextResponse.json({ error: 'User do not find!' }, { status: 409 })
        }
             
        const comment = await prisma.comment.create({
            data: {
                author: { connect: { id: body.id } } as any,
                text: body.text,
                imageSrc: body.image,
                blog: { connect: { id: body.blogId } } as any,
                authorId: body.id,
                nameAuthor: body.name
            }
        })
    
        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}
