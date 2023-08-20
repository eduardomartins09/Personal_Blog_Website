'use client'

import { useState, SetStateAction, Dispatch } from "react"
import { redirect, useRouter } from "next/navigation"

import Input from "../GlobalComponents/Input/Input"

import { BsSearch } from "react-icons/bs"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface SearchBarNavbarProps {
    navOpen: boolean
    setNavOpen: Dispatch<SetStateAction<boolean>>
}

const SearchBarNavbar = ({ navOpen, setNavOpen }: SearchBarNavbarProps) => {
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
    <form className={`flex items-center rounded-md bg-light-white mt-6 ${!navOpen ? "px-2.5" : "px-4"} py-2`}>
        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${navOpen && "mr-2"}`} />

        <Input placeholder='Search...' id='search' type='search' value={search} name='name' onChange={(e) => setSearch(e.target.value)} containerStyles={`text-base bg-transparent w-full text-white focus:outline-none ${!navOpen && "hidden"}`} onKeyDown={handleKeyDown} />
    </form>
  )
}

export default SearchBarNavbar