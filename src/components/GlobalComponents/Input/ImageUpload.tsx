import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value:string) => void
    value:string
}

const ImageUpload:React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback((result:any) => {
    onChange(result.info.secure_url)
  },[onChange])

  return (
    <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='m8szafi0'
        options={{
            maxFiles:1
        }}
    >

        {({open}) => {
            return (
                <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 border-dashed border-2 flex flex-col justify-center items-center h-[500px]'>
                    <TbPhotoPlus />        
                    <div className='text-lg'>
                        Click to upload
                    </div>

                    {value && (
                        <div className='absolute inset-0 w-full h-full'>
                            <Image alt='upload' fill style={{objectFit:'contain'}} src={value} priority />
                        </div>
                    )}
                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default ImageUpload