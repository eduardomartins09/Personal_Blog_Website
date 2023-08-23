import Image from "next/image"
import Link from "next/link"

interface NewsMainCardProps {
    link: string
    image: string
    categoryName: string | null
    headline: string
    date: string
}

const NewsMainCard = ({ link, image, categoryName, headline, date }: NewsMainCardProps) => {
  return (
    <Link href={`/blogs/${link}`} className="relative flex flex-col">
        <div className="">  
            <Image src={image} width={650} height={450} alt="image" className="h-auto" />                 
        </div>
        <div className="py-2">
            <h2 className="text-xl font-semibold">{headline}</h2>
        </div>
        <span className="absolute uppercase left-0 top-0 text-white z-10 bg-red-700 p-2">{categoryName}</span>
        <div className="flex-grow"></div> 
        <div className="py-2">
            <h3 className="text-sm font-medium mt-4">{date}</h3>
        </div>
    </Link>
  )
}

export default NewsMainCard