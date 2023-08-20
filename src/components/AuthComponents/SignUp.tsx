'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { forgotPasswordWithCredentials, signUpWithCredentials } from "@/actions/serverActions"

import Input from "../GlobalComponents/Input/Input"
import Form from "../GlobalComponents/Form/Form"
import ButtonForm from "../GlobalComponents/Buttons/ButtonForm"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = ({ session }) => {
  const router = useRouter()

  if (session) {
    toast.error('You are already logged in')
    router.push("/")
  }

  async function handleSignUpCredentials(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await signUpWithCredentials(name, email, password)
    
    if (res?.msg) {
        toast.success(res?.msg)
        router.push("/auth/login")
    } 
  }

  return (
    <section>
      <div className="border-2 border-red-600 w-fit mx-auto text-center">
        <h1 className="text-2xl bg-red-600 p-4">Register</h1>
        <Form action={handleSignUpCredentials}>
            <div className="flex flex-col max-w-[500px] justify-center mx-auto gap-2 p-8">
                <Input placeholder="Name" name="name" id="name" type="text" containerStyles={"px-4 py-2 rounded-xl"} />
                <Input placeholder="Email" name="email" id="email" type="email" containerStyles={"px-4 py-2 rounded-xl"} />
                <Input placeholder="Password" name="password" id="password" type="password" containerStyles={"px-4 py-2 rounded-xl"} />        
                <ButtonForm value="Sign Up" className="my-4 border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-slate-900 hover:text-white" />
            </div>
        </Form>
        <div className="p-8">
            <h2 className="text-lg">Already have an account ? <Link href='/auth/login' className="text-red-600 underline">Sign in</Link></h2>
        </div>
      </div>  
      <ToastContainer />
    </section>
  )
}

export default SignUp