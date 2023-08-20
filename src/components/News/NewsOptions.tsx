'use client'

import axios from "axios"
import { useRouter } from "next/navigation"

import { RiDeleteBin5Line } from "react-icons/ri"
import { BsFillPencilFill } from "react-icons/bs"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface NewsOptionsProps {
  id?: string
}

const NewsOptions = ({ id }: NewsOptionsProps) => {
  const router = useRouter()

  const onDelete = () => {
    axios.delete(`/api/blogs/${id}`)
    .then(() => {
      toast.success('Blog has been deleted succefully!')
      router.refresh()
    })
    .catch((error) => {
      toast.error(error)
    })
    .finally(() => {
      router.push('/') 
    })
  }

  return (
    <div className="flex items-center justify-end gap-6">
      <RiDeleteBin5Line onClick={onDelete} className="cursor-pointer text-[1.8rem]" />
      <BsFillPencilFill onClick={() => router.push(`/blogs/edit/${id}`)} className="cursor-pointer text-[1.5rem]" />
      <ToastContainer />
    </div>
  )
}

export default NewsOptions