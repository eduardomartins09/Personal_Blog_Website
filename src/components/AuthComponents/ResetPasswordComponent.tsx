'use client'

import { useRouter } from "next/navigation"
import { resetPasswordWithCredentials } from "@/actions/serverActions"

import Form from "../GlobalComponents/Form/Form"
import Input from "../GlobalComponents/Input/Input"
import ButtonForm from "../GlobalComponents/Buttons/ButtonForm"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPasswordComponent = ({ token }) => {
  const router = useRouter()

  async function handleResetPassword(formData) {
    const password = formData.get('password')    

    const res = await resetPasswordWithCredentials( token, password )
    
    if (res?.msg) {
      toast.success(res?.msg)
      router.push("/auth/login")
    } 
  }

  return (
    <section>
      <div className="border-2 border-red-600 w-fit  mx-auto text-center">
        <h1 className="text-2xl bg-red-600 p-4">Reset Password</h1>       
        <div className="flex flex-col max-w-[500px] justify-center mx-auto gap-2 p-8">        
        <Form action={handleResetPassword}>
          <Input placeholder="Password" name="password" id="password" type="password" containerStyles={"px-4 py-2 rounded-xl"} />  
          <ButtonForm value="Reset Password" className="my-4 border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-slate-900 hover:text-white" />
        </Form>
        </div>        
      </div>
      <ToastContainer />
    </section>
  )
}

export default ResetPasswordComponent