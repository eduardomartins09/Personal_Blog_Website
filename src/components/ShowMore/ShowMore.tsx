'use client'

import { useRouter } from "next/navigation"
import { updateSearchParams } from "@/utils" 
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

interface ShowMoreProps {
    pageNumber: number
    isNext: boolean
    numberOfButtons: number
}

const ShowMore = ({ pageNumber, isNext , numberOfButtons }: ShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = (numberToGo:number) => {      
    const newPathName = updateSearchParams("page", `${numberToGo}`)

    router.push(newPathName)
  }

  const goFowardOrBackwards = (optionType: string) => {
    if (optionType === 'fowards') {
        const newLimit = pageNumber + 1

        const newPathName = updateSearchParams("page", `${newLimit}`)
        router.push(newPathName)
    } else {
        const newLimit = pageNumber - 1

        if (newLimit === 0) return
        
        const newPathName = updateSearchParams("page", `${newLimit}`)
        router.push(newPathName)
    }
  }

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-1 sm:gap-5 mt-10 bg-light-white rounded-xl">              
      <button onClick={() => goFowardOrBackwards('backwards')} className="p-1 sm:p-4">
        <AiOutlineArrowLeft className="cursor-pointer text-lg sm:text-2xl" />
      </button>
      {Array.from({ length: numberOfButtons }, (_, index) => index + 1).map((number) => (
        <button key={number} onClick={() => handleNavigation(number)} className="text-base sm:text-2xl p-4">
          {number}
        </button>
      ))}
      <button disabled={isNext}  onClick={() => goFowardOrBackwards('fowards')} className="p-1 sm:p-4">
        <AiOutlineArrowRight className="cursor-pointer text-lg sm:text-2xl" />
      </button>              
    </div>
  )
}

export default ShowMore