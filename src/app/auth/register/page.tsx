import { getSession } from "@/actions/getCurrentUser"

import SignUp from "@/components/AuthComponents/SignUp"

const RegisterPage = async () => {
  const session = await getSession()

  return (
    <main className="p-8 bg-slate-800 text-white">
      <SignUp session={session} />
    </main>
  )
}

export default RegisterPage