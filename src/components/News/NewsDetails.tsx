import Image from 'next/image'
import Link from 'next/link'
import HTMLReactParser from 'html-react-parser'

import { getSession } from '@/actions/getCurrentUser'

import { formartDateDetails } from '@/utils'
import { NewsDetailsProps } from '@/types'

import NewsOptions from './NewsOptions'

import { Dosis } from 'next/font/google'

const dosis = Dosis({
  weight: ['200', '300' , '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const NewsDetails = async ({ name, description, createdAt, imageSrc, categoryName, linkId, userId }: NewsDetailsProps) => {
  const session = await getSession()

  return (  
    <div className='p-2'>
      <div className="flex flex-col pb-4">
        <div className='bg-red-700 p-4'>
          <h1 className={`text-3xl font-semibold text-white mb-2 ${dosis.className}`}>{name}</h1>
        </div>
        <div className='flex items-center justify-between my-4'>
          <p className='font-semibold uppercase'>{categoryName}</p>
          <p className='font-semibold'>Published - {formartDateDetails(createdAt)}</p>
        </div>
        <div className='my-2'>
          <Link href="https://www.jacienydias.com.br/" target='_blank' className='font-semibold text-xl hover:text-gray-800'>
            Source: Blog Jacieny Dias
          </Link>
        </div>
        <div className='bg-light-white px-8 py-4 text-black'>
          <div>
            <div>
              <Image src={imageSrc} width={300} height={300} priority={true} alt={`Image-${name}`} className='border-0 align-middle w-[100%] md:w-[75%] md:mx-auto h-auto rounded-sm' />
            </div>
            <div className="my-4">           
              {description && (
                <div className='indent-5 text-justify text-4vw md:text-5vw lg:text-6vw'>
                  {HTMLReactParser(description)}
                </div>
              )}
            </div>
          </div>
          {session && (
            userId === session?.user?.id && session?.user?.role === "admin" && (
              <div className='mt-8'>
                <NewsOptions id={linkId} />
              </div>
            )
          )}
        </div>  
      </div>
      <div>
        <Link href="/" className="">
          <span className='border-2 border-gray-700 p-4 text-lg font-semibold rounded-full w-full block text-center hover:bg-gray-100'>Voltar</span>   
        </Link>             
      </div>
    </div>
  )
}

export default NewsDetails