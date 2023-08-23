'use client'

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SearchBarVisibleNavbar = () => {
  const [search, setSearch] = useState("")
  const [isInputVisible, setInputVisible] = useState(false)

  const router = useRouter()
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if(search === ""){
      toast.error("All fields are required")
      return
    }
    
    router.push(`/search?search=${search}`)
    setSearch("")  
    setInputVisible(false)
  }

  const toggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  return (
    <form className="relative lg:w-40" onSubmit={onSubmit}>
      <AiOutlineSearch
        size={30}  
        className={`text-gray-600 cursor-pointer absolute top-1/2 transform -translate-y-1/2 ${isInputVisible ? 'hidden' : 'left-2'}`}
        onClick={toggleInput}
      />
      <AiOutlineClose
        size={30}  
        className={`text-gray-600 cursor-pointer absolute top-1/2 transform -translate-y-1/2 ${isInputVisible ? 'right-2' : 'hidden'}`}
        onClick={toggleInput}
      />
      <input
        type="text"
        value={search}
        placeholder='Search...'
        className={`border rounded-xl p-2 outline-none w-full ${isInputVisible ? '' : 'hidden'}`}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus={isInputVisible}
      />     
    </form>
  )
}

export default SearchBarVisibleNavbar