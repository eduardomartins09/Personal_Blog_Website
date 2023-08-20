import Link from "next/link"

import { verifyWithCredentials } from "@/actions/serverActions"

import Ads from "@/components/GlobalComponents/Ads/Ads"

const VerifyPage = async ({ searchParams: { token } }) => {
  const res = await verifyWithCredentials(token)

  return (
    <main className="p-8 bg-slate-800 grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8">
      <div className="bg-white h-fit p-8">
        <h1 className="text-green-700">{res?.msg}</h1>    
        <Link href="/auth/login" className="border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white">
          Go to login
        </Link>
      </div>
      <Ads /> 
    </main>
  )
}

export default VerifyPage