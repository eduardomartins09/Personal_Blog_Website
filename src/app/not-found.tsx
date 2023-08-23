import Ads from '@/components/GlobalComponents/Ads/Ads'
import Link from 'next/link'

export default function NotFound() {
    
  return (
    <div className='px-5 sm:px-20 py-8 bg-white text-black grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8 mt-16 md:mt-0'> 
      <div className='bg-light-white h-fit p-8 mt-4'>
        <h1 className='text-2xl font-semibold mb-6'>Not found – 404!</h1>
        <Link href="/" className="border-2 border-gray-700 p-3 text-xl font-semibold rounded-full w-full hover:bg-gray-200">Go Back To Home</Link>
      </div>
      <div>
        <Ads />
      </div>
    </div>
  ) 
}
