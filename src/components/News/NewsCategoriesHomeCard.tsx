import Image from "next/image"
import Link from "next/link"

interface NewsCategoriesHomeCardProps {
    link: string
    image: string
    categoryName: string | null
    headline: string
    date: string
    isFirst: boolean
}

const NewsCategoriesHomeCard = ({ link, image, categoryName, headline, date, isFirst }: NewsCategoriesHomeCardProps) => {
  return (
    <div className={`border-b-2 border-b-[rgba(0, 0, 0, 0.17)] ${isFirst ? '' : 'mt-5'}`}>
        <Link href={`/blogs/${link}`} className="relative flex flex-col">
            {isFirst 
                ? (
                    <div>  
                        <Image src={image} width={800} height={450} alt="image" className="h-auto w-full" />                 
                    </div>
                )
                : (
                    <h2 className="text-red-700 capitalize text-sm">{categoryName}</h2>
                )
            }
            <div className="py-2">
                <h2 className="text-xl font-semibold">{headline}</h2>
            </div>
            <div className="flex-grow"></div> 
            <div className="py-2">
                <h3 className="text-sm font-medium mt-4">{date}</h3>
            </div>
        </Link>
    </div>
  )
}

export default NewsCategoriesHomeCard