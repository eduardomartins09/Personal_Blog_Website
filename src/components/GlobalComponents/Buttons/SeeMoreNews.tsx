'use client'

import { useRouter } from 'next/navigation'
import CustomButton from './CustomButton'

const SeeMoreNews = () => {
  const router = useRouter()  
  
  return (
    <>
      <CustomButton
        title='See more news'
        btnType='button'
        containerStyles='my-6 bg-slate-700 border-2 border-gray-700 p-4 text-lg rounded-full w-full hover:bg-slate-900 hover:text-white'
        handleClick={() => router.push("/blogs")}
      />
    </>
  )
}

export default SeeMoreNews