import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import ResetPasswordComponent from "@/components/AuthComponents/ResetPasswordComponent"

const ResetPassword = async ({ searchParams: { token } }) => {
  if (token === undefined) redirect("/")

  const session = await getSession()

  if (session) redirect("/")

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <ResetPasswordComponent token={token} />
    </main>
  )
}

export default ResetPassword