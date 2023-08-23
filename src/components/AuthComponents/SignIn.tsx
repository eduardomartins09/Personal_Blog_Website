'use client'

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { forgotPasswordWithCredentials } from "@/actions/serverActions"

import Input from "../GlobalComponents/Input/Input"
import Form from "../GlobalComponents/Form/Form"
import ButtonForm from "../GlobalComponents/Buttons/ButtonForm"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = ({ callbackUrl, session }) => {
  const router = useRouter()

  if (session) {
    toast.error('You are already logged in')
    router.push("/")
  }

  const [showEmailPassword, setShowEmailPassword] = useState(false)

  async function handleCredentialsLogin(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', { email, password, callbackUrl }).catch(() => {
      toast.error('Wrong Credentials')
    })
  }

  const forgotPassword = async (formData) => {
    const email = formData.get('emailToPassword')
    
    const res = await forgotPasswordWithCredentials(email)
    
    if (res?.msg) {
      toast.success(res?.msg)
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } 
  }

  return (
    <section>
      <div className="border-2 border-red-600 w-fit mx-auto text-center">
        <h1 className="text-2xl bg-red-600 p-4">Login</h1>
        <Form action={handleCredentialsLogin}>
            <div className="flex flex-col max-w-[500px] justify-center mx-auto gap-2 p-8">
                <Input placeholder="Email" name="email" id="email" type="email" containerStyles={"bg-light-white px-4 py-2 rounded-xl"} />
                <Input placeholder="Password" name="password" id="password" type="password" containerStyles={"bg-light-white px-4 py-2 rounded-xl"} />
                <ButtonForm value="Login" className="my-4 border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-100" />
            </div>
        </Form>
        <h2 className="text-lg">Forgot password ? <button type="button" onClick={() => setShowEmailPassword(!showEmailPassword)} className="text-red-600 underline">Click here</button></h2>
        {showEmailPassword && (
            <div className="flex flex-col max-w-[500px] justify-center mx-auto gap-2 px-8 py-2">
                <Form action={forgotPassword}>
                    <Input placeholder="Email" name="emailToPassword" id="emailToPassword" type="email" containerStyles={"bg-light-white px-4 py-2 rounded-xl"} />
                    <ButtonForm value="Forgot Password" className="my-4 border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-100" />
                </Form>
            </div>
        )}
        <div className="p-8">
            <h2 className="text-lg">Havent you got an account yet ? <Link href='/auth/register' className="text-red-600 underline">Sign uo</Link></h2>
        </div>
      </div>  
      <ToastContainer />
    </section>
  )
}

export default SignIn