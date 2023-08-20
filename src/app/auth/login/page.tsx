import { getSession } from "@/actions/getCurrentUser"

import SignIn from "@/components/AuthComponents/SignIn"

const LoginPage = async ({ searchParams: { callbackUrl } }) => {
  const session = await getSession()

  return (
    <main className="p-8 bg-slate-800 text-white">
      <SignIn callbackUrl={callbackUrl || "/"} session={session} />
    </main>
  )
}

export default LoginPage