'use client'

import Ads from "@/components/GlobalComponents/Ads/Ads"
import { useRouter, useSearchParams } from "next/navigation"

const ErrorsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errMsg = searchParams.get('error')

  return (
    <main className="p-8 bg-slate-800 grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
      <div className="bg-white h-fit p-8">
        <h1 className="text-red-700 text-3xl mb-16">Error: {errMsg}</h1>
        {errMsg === "Invalid credentials" 
          ? (
            <button type="button" onClick={() => router.push("/auth/login")} className="border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white">Try Again</button>
          )
          : errMsg === "Email already exists!" ? (
            <button type="button" onClick={() => router.push("/auth/register")} className="border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white">Try Again</button>           
          )  
          : (
            <button type="button" onClick={() => router.push("/")} className="border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white">Go Home</button>
          )
        }
      </div>
      <Ads />
    </main>
  )
}

export default ErrorsPage