'use client'

import { useRouter } from "next/navigation"

import { changePasswordWithCredentials } from "@/actions/serverActions"

import Input from "../GlobalComponents/Input/Input"
import ButtonForm from "../GlobalComponents/Buttons/ButtonForm"
import Form from "../GlobalComponents/Form/Form"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ChangePasswordComponent = () => {
  const router = useRouter()

  async function handleChangePassword(formData) {
    const old_pass = formData.get('old_password')
    const new_pass = formData.get('new_password')

    const res = await changePasswordWithCredentials(old_pass, new_pass)

    if (res?.msg) {
      toast.success(res?.msg)
      router.push("/")
    }
  }
    
  return (
    <section>
      <div className="border-2 border-red-600 w-fit  mx-auto text-center">
        <h1 className="text-2xl bg-red-600 p-4">Change Password</h1>
        <div className="flex flex-col max-w-[500px] justify-center mx-auto gap-2 p-8">
          <Form action={handleChangePassword}>
            <Input placeholder="Old Password" name="old_password" id="old_password" type="password" containerStyles={"px-4 py-2 rounded-xl"} />
            <Input placeholder="New Password" name="new_password" id="new_password" type="password" containerStyles={"px-4 py-2 rounded-xl mt-4"} />
            <ButtonForm value="Change Password" className="my-4 border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-slate-900 hover:text-white" />
          </Form>
        </div>
      </div>  
      <ToastContainer />
    </section>
  )
}

export default ChangePasswordComponent