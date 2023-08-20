'use client'

import axios from "axios"
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import JoditEditor from "jodit-react"
import HTMLReactParser from "html-react-parser"

import { InitialStateCreateAndEditProps, NewsEditProps } from "@/types"

import ImageUpload from "@/components/GlobalComponents/Input/ImageUpload"
import Input from "../GlobalComponents/Input/Input"
import CustomButton from "../GlobalComponents/Buttons/CustomButton"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialState: InitialStateCreateAndEditProps = {
    name: '',
    description: '',
    imageSrc: '',
    categoryName: ''
}

const NewsEditCard = ({ name, description, imageSrc, blogId, categoryName }: NewsEditProps) => {
   const [state, setState] = useState(initialState)
   const [onActive, setOnActive] = useState(false)

   const router = useRouter()  
   const editor = useRef(null)

   useEffect(() => {
    setState({
      name: name || '',
      description: description || '',
      imageSrc: imageSrc || '',
      categoryName: categoryName || '',
    })
  }, [name, description, imageSrc, categoryName])

   const config = {
    readonly: false,
    height: 600,
    spellcheck: true,
    toolbarButtonSize: 'large' as 'large',
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

    axios.put(`/api/blogs/${blogId}`,state)
    .then(() => {
        router.push('/')
        toast.success("Blog has been edited succefully")
    })
    .catch((err) => {
        toast.error(err.response.data.error)
    })
  }

  return (
    <div className="py-12 px-8 bg-blue-200 flex flex-col gap-4">
        <form onSubmit={onSubmit} className="bg-blue-200">
            <div>
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
            <div className="flex flex-col justify-center mx-auto gap-2 mt-4">
                <Input placeholder="Blog Headline" name="name" id="name" type="text" onChange={handleChange} value={state.name} containerStyles={"px-4 py-2 rounded-xl"} />
                <Input placeholder='Blog category' id='categoryName' type='text' value={state.categoryName} name='categoryName' onChange={handleChange} containerStyles={"px-4 py-2 rounded-xl"} />
                <div className='max-w-[100%] mb-4 text-black' tabIndex={1}>
                    <JoditEditor
                      ref={editor}
                      value={state.description}
                      config={config}                  
                      onBlur={(newContent) => setState({ ...state, description: newContent })}
                    /> 
                </div>
            </div>
            <CustomButton
                title='Submit'
                btnType='submit'
                containerStyles='border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white'
            />
        </form> 
        <ToastContainer />
    </div>
  )
}

export default NewsEditCard