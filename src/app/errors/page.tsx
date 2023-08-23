'use client'

import { useRouter, useSearchParams } from "next/navigation"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import AdsCard from "@/components/GlobalComponents/Ads/AdsCard"
import CustomButton from "@/components/GlobalComponents/Buttons/CustomButton"

const ErrorsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errMsg = searchParams.get('error')

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8 mt-16 md:mt-0">
      <div className="bg-light-white h-fit p-8 mt-4">
        <h1 className="text-red-700 text-3xl mb-16">Error: {errMsg}</h1>
        {errMsg === "Invalid credentials" 
          ? (
            <CustomButton
              title="Try Again"
              btnType='button'
              containerStyles='border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-200'
              handleClick={() => router.push("/auth/login")}
            />
          )
          : errMsg === "Email already exists!" ? (        
            <CustomButton
              title="Try Again"
              btnType='button'
              containerStyles='border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-200'
              handleClick={() => router.push("/auth/register")}
            />       
          )  
          : (
            <CustomButton
              title="Go Home"
              btnType='button'
              containerStyles='border-2 border-gray-700 p-5 text-xl font-semibold rounded-full w-full hover:bg-gray-200'
              handleClick={() => router.push("/")}
            />
          )
        }
      </div>
      <div className="hidden lg:block">
        <Ads />
      </div>
      <div className="grid items-center justify-center bg-light-white py-5 gap-8 mt-5 lg:hidden">
        <AdsCard image="/banner-ads.jpg" link="/contact" />
      </div> 
    </main>
  )
}

export default ErrorsPage