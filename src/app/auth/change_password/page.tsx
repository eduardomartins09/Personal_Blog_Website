import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import ChangePasswordComponent from "@/components/Profile/ChangePasswordComponent"

const ChangePasswordPage = async () => {
  const session = await getSession()

  if (!session) redirect("/auth/login")

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <ChangePasswordComponent />
    </main>
  )
}

export default ChangePasswordPage