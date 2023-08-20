'use client'

import { sendEmailToMe } from "@/actions/serverActions"

import ButtonForm from "../GlobalComponents/Buttons/ButtonForm"
import Form from "../GlobalComponents/Form/Form"
import Input from "../GlobalComponents/Input/Input"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ContactEmail = () => {
  async function handleCredentialsLogin(formData) {
    const email = formData.get('email')
    const name = formData.get('name')
    const msg = formData.get('msg')

    const res = await sendEmailToMe(email, name, msg)

    if (res?.msg) {
        toast.success(res?.msg)
    } 
  }

  return (
    <section className="w-full">
        <Form action={handleCredentialsLogin}>
            <h2 className="bg-slate-600 p-2 text-2xl text-white font-semibold">Send me an email</h2>
            <div className="grid lg:grid-cols-2 gap-4 lg:justify-between py-6">
                <Input placeholder="Name" name="name" id="name" type="text" containerStyles={"px-4 py-2 rounded-xl border-2"} />
                <Input placeholder="Email" name="email" id="email" type="email" containerStyles={"px-4 py-2 rounded-xl border-2"} />
            </div>
            <div>
                <textarea name="msg" id="msg" cols={30} rows={10} placeholder="Message" className="border-2 w-[100%] p-2" />
            </div>
            <ButtonForm value="Send Email" className="my-4 border-2 bg-slate-600 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-slate-900 text-white" />
        </Form>
        <ToastContainer />
    </section>
  )
}

export default ContactEmail