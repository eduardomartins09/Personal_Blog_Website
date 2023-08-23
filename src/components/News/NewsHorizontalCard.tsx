import Image from "next/image"
import Link from "next/link"

interface NewsHorizontalCardProps {
    link: string
    image: string
    headline: string
    date: string
}

const NewsHorizontalCard = ({ link, image, headline, date }: NewsHorizontalCardProps) => {
  return (
    <div className="border-b-2 border-b-[rgba(0, 0, 0, 0.17)]">
        <Link href={`/blogs/${link}`} className="grid sm:grid-cols-2 gap-8">
            <div>  
                <Image src={image} width={1500} height={1000} alt="image" className="h-full w-full sm:object-fill" />                 
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="xl:text-2xl font-bold">{headline}</h2>
                    <p className="mt-2 text-xs xl:text-lg">By <span className="font-semibold">Eduardo M</span></p>
                </div>
                <div className="flex-grow"></div>
                <div className="py-2">
                    <h3 className="text-sm xl:text-lg font-medium mt-4">{date}</h3>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default NewsHorizontalCard