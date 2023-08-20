'use client'

import { FormEvent, useEffect, useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Input from "../GlobalComponents/Input/Input"
import CustomButton from "../GlobalComponents/Buttons/CustomButton"
import ImageUpload from '@/components/GlobalComponents/Input/ImageUpload'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface InitialStateProps {
  name: string | undefined | null
  image: string | undefined | null
}

const initialState: InitialStateProps = {
  name: '',
  image: ''
}

const ChangeUserInfo = ({ name, image }: InitialStateProps) => {
  const { data: session, update } = useSession()
  const [state, setState] = useState(initialState)
  const [changeOpen, setChangeOpen] = useState(false)
  
  const router = useRouter()

  useEffect(() => {
    setState({
      name: name || '',
      image: image || ''
    })
  }, [name, image])
    
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
    setChangeOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    try {
      if(state.name === ''){
        toast.error("All fields are required")
        return
      }

      update({ name: state.name, image: state.image }).then(() => {
        toast.success('User has been altered!')
        router.refresh()
      })
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <section className='py-12 px-8'>     
      <div className="my-6">
        <h2 className="text-2xl font-medium mb-4">Do you want to change your image or name profile ?</h2>
        <CustomButton
          title={`${changeOpen ? 'Click here to close change menu' : 'Click here to open change menu'}`}
          btnType='button'
          containerStyles='border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white'
          handleClick={() => setChangeOpen(!changeOpen)}
        />           
      </div>
      {changeOpen && (
        <form onSubmit={onSubmit}>
          <div>
            <ImageUpload value={state.image || ""} onChange={(value) => setCustomValue('image', value)} />
          </div>
          <div className='flex flex-col justify-center  mx-auto gap-2 mt-4'>
              <Input placeholder='Name' id='name' type='text' value={state.name} name='name' onChange={handleChange} containerStyles={"px-4 py-2 rounded-xl"} />
              <CustomButton
                title='Submit'
                btnType='submit'
                containerStyles='border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white'
              />
          </div>
        </form>
      )}
      <ToastContainer />    
    </section>
  )
}

export default ChangeUserInfo