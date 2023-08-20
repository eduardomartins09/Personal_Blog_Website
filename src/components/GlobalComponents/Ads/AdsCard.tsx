import Image from 'next/image'
import Link from 'next/link'

interface AdsCardProps {
  image: string
  link: string
}
  
const AdsCard = ({ image, link }: AdsCardProps) => {
  return (
    <div className="rounded-sm flex flex-col">  
      <Link href={link}>
        <Image src={image} width={1000} height={1000} alt='ads-image' className='border-2 align-middle inline-block max-w-[100%] h-auto rounded-sm' />
      </Link>    
    </div>
  )
}

export default AdsCard