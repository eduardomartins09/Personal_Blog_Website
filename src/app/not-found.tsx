import Ads from '@/components/GlobalComponents/Ads/Ads'
import Link from 'next/link'

export default function NotFound() {
    
  return (
    <div className='p-8 bg-slate-800 grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8'>
        <div className='bg-white h-fit p-8'>
          <h1 className='text-2xl font-semibold mb-6'>Not found – 404!</h1>
          <Link href="/" className="border-2 border-gray-700 p-3 text-xl font-semibold rounded-full w-full hover:bg-gray-700 hover:text-white">Go Back To Home</Link>
        </div>
        <div>
          <Ads />
        </div>
    </div>
  ) 
}
