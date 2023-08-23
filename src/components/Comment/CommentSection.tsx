'use client'

import axios from 'axios'
import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { CommentSectionProps, InitialStateCommentSectionProps } from '@/types'

import Input from '../GlobalComponents/Input/Input'
import CustomButton from '../GlobalComponents/Buttons/CustomButton'
import CommentCard from './CommentCard'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialState:InitialStateCommentSectionProps = {
    text: '',
    id: '',
    name: '',
    image: '',
    blogId: ''
}

const CommentSection = ({ blogId, comments }: CommentSectionProps) => {
  const { data: session } = useSession()
  const [state, setState] = useState(initialState)
  
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      name: session?.user?.name,
      id: session?.user?.id,
      image: session?.user?.image,
      blogId: blogId
    })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if(!session){
      toast.error("You must be logged in to comment something")
      return
    }

    if(state.text === ''){
      toast.error("All fields are required")
      return
    }

    axios.post('/api/comment', state)
    .then(() => {
      toast.success("Comment created succefully")
      setState({ text: "" })
    })
    .catch((err) => {
      router.push(`/errors?error=${err.message}`)
      toast.error(err.response.data.error)
    })
    
    router.refresh()
  }

  return (
    <section className="mt-8 flex flex-col justify-center items-center border-2 border-light-gray rounded-2xl">
      <form className="p-4 w-full flex items-center border-b-2 gap-4 border-light-gray" onSubmit={onSubmit}>
        <Image src={session?.user?.image || "https://res.cloudinary.com/dbiffor7h/image/upload/f_auto,q_auto/rvbjadkse4u66wotcbv0"} width='45' height='45' alt="image-author-comment" className='object-cover rounded-full border-2 border-light-gray' />
        <Input placeholder='Comment' id='text' type='text' value={state.text} name='text' onChange={handleChange} containerStyles={"bg-light-white px-4 py-2 rounded-xl"} />
        <CustomButton
          title='Post'
          btnType='submit'
          containerStyles='my-4 border-2 border-gray-700 px-8 py-2 text-lg font-semibold rounded-full hover:bg-gray-100 '
        />
      </form>
      <div className="max-h-[300px] overflow-auto mt-2 w-full p-4 flex flex-col items-center gap-4">
        {comments?.length > 0 
          ? (
            comments.map((comment, index) => (
              comment.blogId === blogId && (
                <CommentCard key={comment.id} commentId={comment.id} userId={comment.userId} text={comment.text} image={comment.imageSrc} authorName={comment.nameAuthor} createdAt={comment.createdAt} /> 
              )                 
            ))
          )
          : (
            <h4 className="p-4 text-2xl">No comments. Be the first one to leave a comment!</h4>
          )
        }    
      </div>       
      <ToastContainer />
    </section>
  )
}

export default CommentSection