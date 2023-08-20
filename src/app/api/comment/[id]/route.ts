import { NextResponse } from "next/server"

import getCurrentUser from "@/actions/getCurrentUser"

import prisma from '../../../../lib/prismadb'

interface IParams {
    id: string
}

export async function DELETE( request: Request, {params}: {params: IParams} ) {
    try {
        const { id } = params

        const currentUser = await getCurrentUser()
    
        if (!currentUser) {
            return NextResponse.json({ error: "User doesn't exists!" }, { status: 409 })
        }
        
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: "Invalid Id!" }, { status: 409 })
        }
    
        const comment = await prisma.comment.deleteMany({
            where: {
                id: id
            }
        })     
    
        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}