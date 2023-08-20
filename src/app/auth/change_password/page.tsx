import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import ChangePasswordComponent from "@/components/Profile/ChangePasswordComponent"

const ChangePasswordPage = async () => {
  const session = await getSession()

  if (!session) redirect("/auth/login")

  return (
    <main className="p-8 bg-slate-800 text-white">
      <ChangePasswordComponent />
    </main>
  )
}

export default ChangePasswordPage