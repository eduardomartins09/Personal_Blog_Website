'use server'

import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import prisma from '../lib/prismadb'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { verifyToken, generateToken } from "@/utils/token"
import sendEmail from '@/utils/emailAuth/sendEmail'
import sendEmailContact from "@/utils/emailContact/sendEmailContact"

const BASE_URL = process.env.NEXTAUTH_URL

export async function signUpWithCredentials(name: string, email: string, password: string) {
    try { 
        if (!name || !email || !password) {
            throw new Error('Missing name, email, or password!')
        }
    
        const existingUser = await prisma.user.findMany({
            where: {
              email: email
            },
        })
        
        if (existingUser.length !== 0) {
            throw new Error('Email already exists!')
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const token = generateToken({ user: {email, name, hashedPassword} })

        await sendEmail({
            to: email,
            url: `${BASE_URL}/auth/verify?token=${token}`,
            text: 'VERIFY EMAIL'
        })

        return { msg: 'Sign Up Success! Check your email to complete the registration.' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export async function verifyWithCredentials(token) {
    try { 
        const { user } = verifyToken(token)

        const email = user.email
        const name = user.name
        const hashedPassword = user.hashedPassword

        const newUser = await prisma.user.create({
            data: {
                email, 
                name,
                hashedPassword,
                image: "https://res.cloudinary.com/dbiffor7h/image/upload/f_auto,q_auto/rvbjadkse4u66wotcbv0",
                role: 'user',
            }
        })

        return { msg: 'Verify Success!' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export async function resetPasswordWithCredentials(token, password: string) {
    try { 
        const { userId } = verifyToken(token)

        const newPass = await bcrypt.hash(password, 12)

        const currentUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedPassword: newPass
            }
        })
        
        return { msg: 'Success! Your password has been reset.' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export async function forgotPasswordWithCredentials(email: string) {
    try { 
        const currentUser = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        })
       
        const token = generateToken({ userId: currentUser?.id })

        await sendEmail({
            to: email,
            url: `${BASE_URL}/auth/reset_password?token=${token}`,
            text: 'RESET PASSWORD'
        })
        
        return { msg: 'Success! Check your email to reset your password.' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export async function changePasswordWithCredentials(old_pass: string, new_pass: string) {
    try { 
        const session = await getServerSession(authOptions)
        if(!session) throw new Error('Unathorization!')
    
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id
            }
        })

        if (!user) throw new Error('User does not exist!')

        if (!user.hashedPassword) return

        const compare  = await bcrypt.compare(old_pass, user.hashedPassword)
        if (!compare) throw new Error('Old password does not match!')

        const newPass = await bcrypt.hash(new_pass, 12)

        const updateUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hashedPassword: newPass
            }
        })

        return { msg: 'Change Password Successfully!' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export async function sendEmailToMe(email: string, name: string, msg: string) {
    try { 

        await sendEmailContact({
            from: email, 
            name: name, 
            text: msg
        })
        
        return { msg: 'Success! You email has been sent.' }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}