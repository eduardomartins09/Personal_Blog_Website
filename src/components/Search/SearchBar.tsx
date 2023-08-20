'use client'

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

import { AiOutlineSearch } from "react-icons/ai"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Input from "../GlobalComponents/Input/Input"

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if(search === ""){
      toast.error("All fields are required")
      return
    }
    
    router.push(`/search?search=${search}`)
    setSearch("")  
  }

  return (
    <form className='flex items-center gap-2 pl-4 w-full' onSubmit={onSubmit}>
      <Input placeholder='Search...' id='search' type='text' value={search} name='name' onChange={(e) => setSearch(e.target.value)} containerStyles={"px-4 py-2 rounded-full bg-gray-200 focus:outline-none"} />
      <button type="submit">
        <AiOutlineSearch 
          size={45} 
          className='bg-gray-200 text-black font-bold border-solid border-2 border-gray-800 rounded-full p-2 cursor-pointer' 
        />
      </button>
      <ToastContainer />
    </form>
  )
}

export default SearchBar