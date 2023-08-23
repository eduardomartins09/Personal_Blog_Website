import Link from "next/link"
import { redirect } from "next/navigation"

import { verifyWithCredentials } from "@/actions/serverActions"

import Ads from "@/components/GlobalComponents/Ads/Ads"

const VerifyPage = async ({ searchParams: { token } }) => {
  const res = await verifyWithCredentials(token)
  
  setTimeout(() => {
    redirect("/auth/login")
  }, 3000)

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8 mt-16 md:mt-0">
      <div className="bg-light-white h-fit p-8 mt-4">
        <h1 className="text-green-700 text-xl mb-6">{res?.msg}</h1>    
        <Link href="/auth/login" className="border-2 border-gray-700 p-3 text-xl font-semibold rounded-full w-full hover:bg-gray-200">Go To Login</Link>
      </div>
      <Ads /> 
    </main>
  )
}

export default VerifyPage