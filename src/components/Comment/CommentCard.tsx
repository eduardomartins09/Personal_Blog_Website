'use client'

import axios from 'axios'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

import { formartDateHome } from '@/utils'

import { BsTrash } from 'react-icons/bs'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CommentCardProps {
  userId: string
  commentId: string
  text: string
  image: string
  authorName: string
  createdAt: string
}

const CommentCard = ({ commentId, userId, text, image, authorName, createdAt }: CommentCardProps) => {
  const {data: session} = useSession()
  const router = useRouter()

  const handleDeleteComment = () => {
    axios.delete(`/api/comment/${commentId}`)
    .then(() => {
      toast.success('Commentary has been deleted succefully!')
      router.refresh()
    })
    .catch((error) => {
      throw new Error(error)
    })
  }

  return (
    <div className="w-full h-full border-2 border-light-gray rounded-md p-3">
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex gap-4">
          <Image src={image} width='45' height='45' alt="image-author-comment" className='w-[40px] h-[40px] rounded-full object-cover' />
          <div className="flex flex-col items-start gap-1">
            <h4>{authorName}</h4>
            <span className="text-sm text-light-gray">{formartDateHome(createdAt)}</span>
          </div>
          <span>{text}</span>
        </div>
        <div>
          {(session?.user?.id === userId || session?.user?.role === "admin")  && (
            <BsTrash className="cursor-pointer" size={30} onClick={handleDeleteComment}  />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CommentCard