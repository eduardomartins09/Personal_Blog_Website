import { redirect } from "next/navigation"

import ResetPasswordComponent from "@/components/AuthComponents/ResetPasswordComponent"

const ResetPassword = ({ searchParams: { token } }) => {
  if (token === undefined) redirect("/")

  return (
    <main className="p-8 bg-slate-800 text-white">
      <ResetPasswordComponent token={token} />
    </main>
  )
}

export default ResetPassword