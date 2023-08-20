'use client'

import axios from 'axios'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import JoditEditor from "jodit-react"

import Input from '@/components/GlobalComponents/Input/Input'
import ImageUpload from '@/components/GlobalComponents/Input/ImageUpload'
import CustomButton from '../GlobalComponents/Buttons/CustomButton'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { InitialStateCreateAndEditProps } from '@/types'

const initialState:InitialStateCreateAndEditProps = {
    name: '',
    imageSrc: '',
    description: '',
    categoryName: ''
}

const NewsCreateCard = () => {
  const [state, setState] = useState(initialState)
  const router = useRouter()

  const editor = useRef(null)
  
  const config = {
    readonly: false,
    height: 600,
    spellcheck: true,
    toolbarButtonSize: 'large' as 'large'
  }

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value
    }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if(state.name === '' || state.imageSrc === '' || state.description === '' || state.categoryName === ''){
      toast.error("All fields are required")
      return
    }

    axios.post('/api/blogs',state)
    .then(() => {
      toast.success("Blog created succefully")
      router.push('/')
    })
    .catch((err) => {
      router.push(`/errors?error=${err.message}`)
      toast.error(err.response.data.error)
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
      <div className='flex flex-col justify-center  mx-auto gap-2 mt-4'>
        <Input placeholder='Blog Headline' id='name' type='text' value={state.name} name='name' onChange={handleChange} containerStyles={"px-4 py-2 rounded-xl"} />
        <Input placeholder='Blog category' id='categoryName' type='text' value={state.categoryName} name='categoryName' onChange={handleChange} containerStyles={"px-4 py-2 rounded-xl"} />
        <div className='max-w-[100%] mb-4 text-black' tabIndex={1}>
          <JoditEditor
            ref={editor}
            value={state.description}
            config={config}              
            onBlur={(newContent) => setState({ ...state, description: newContent })}
          /> 
        </div>
        <CustomButton
          title='Submit'
          btnType='submit'
          containerStyles='border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white'
        />
      </div>
      <ToastContainer />
    </form>  
  )
}

export default NewsCreateCard