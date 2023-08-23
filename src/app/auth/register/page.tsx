import { getSession } from "@/actions/getCurrentUser"

import SignUp from "@/components/AuthComponents/SignUp"

const RegisterPage = async () => {
  const session = await getSession()

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <SignUp session={session} />
    </main>
  )
}

export default RegisterPage