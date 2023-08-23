import { getSession } from "@/actions/getCurrentUser"

import SignIn from "@/components/AuthComponents/SignIn"

const LoginPage = async ({ searchParams: { callbackUrl } }) => {
  const session = await getSession()

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <SignIn callbackUrl={callbackUrl || "/"} session={session} />
    </main>
  )
}

export default LoginPage