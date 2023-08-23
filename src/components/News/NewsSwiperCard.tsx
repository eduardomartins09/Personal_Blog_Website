import Image from 'next/image'
import Link from 'next/link'

import { formartDateHome } from '@/utils'

import { NewsSwiperCardProps } from '@/types'

const NewsSwiperCard = ({ image, headline, date, linkId, notSwiper }: NewsSwiperCardProps) => {
  const home = "h-[130px] sm:h-[150px] md:h-[120px] xl:h-[140px]"
  const swiper = "h-[130px] md:h-[150px] xl:h-[130px]"

  return (
    <div className="bg-white text-black rounded-xl py-2 my-2 flex flex-col h-fit">  
      <div className='relative pb-[64%] m-0'>
        <div className='absolute p-2 w-[100%] h-[100%] flex items-center justify-center'>
          <Link href={`/blogs/${linkId}`}>
            <Image src={image} width={1000} height={1000} alt={`${headline} - Image`} className='border-0 align-middle inline-block max-w-[100%] h-auto rounded-xl' /> 
          </Link>
        </div>
      </div>
      <div className="py-4 px-3 text-gray-800">  
        <p className="text-base text-gray-700 capitalize tracking-wide font-semibold mb-4">
          {formartDateHome(date)} - Eduardo M 
        </p>
        <h3 className={`font-semibold text-xl leading-tight ${notSwiper ? home : swiper}`}>
          {headline}
        </h3> 
        <Link href={`/blogs/${linkId}`} className='text-gray-900 text-left py-2'>
          continuar lendo...
        </Link>                                                 
      </div>
    </div>
  )
}

export default NewsSwiperCard