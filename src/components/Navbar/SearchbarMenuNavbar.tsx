'use client'

import { useState, SetStateAction, Dispatch } from "react"
import { useRouter } from "next/navigation"

import Input from "../GlobalComponents/Input/Input"

import { BsSearch } from "react-icons/bs"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface SearchbarMenuNavbarProps {
    navOpen: boolean
    setNavOpen: Dispatch<SetStateAction<boolean>>
}

const SearchbarMenuNavbar = ({ navOpen, setNavOpen }: SearchbarMenuNavbarProps) => {
  const [search, setSearch] = useState("")
  const router = useRouter()
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        
        if(search === ""){
          toast.error("All fields are required")
          return
        }

        setNavOpen(false)
        router.push(`/search?search=${search}`)
        setSearch("")  
    }
  }

  return (
    <form className={`flex items-center rounded-md border-2 mt-6 ${!navOpen ? "px-2.5" : "px-4"} py-2`}>
        <BsSearch className={`text-lg block float-left cursor-pointer ${navOpen && "mr-2"}`} />

        <Input placeholder='Search...' id='search' type='search' value={search} name='name' onChange={(e) => setSearch(e.target.value)} containerStyles={`text-base bg-transparent text-black w-full focus:outline-none ${!navOpen && "hidden"}`} onKeyDown={handleKeyDown} />
    </form>
  )
}

export default SearchbarMenuNavbar