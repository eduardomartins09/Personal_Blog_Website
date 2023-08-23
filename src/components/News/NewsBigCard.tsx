import Image from "next/image"
import Link from "next/link"

interface NewsBigCardProps {
    link: string
    image: string
    categoryName: string | null
    headline: string
    date: string
}

const NewsBigCard = ({ link, image, categoryName, headline, date }: NewsBigCardProps) => {
  return (
    <Link href={`/blogs/${link}`} className="relative border-2 mt-4 lg:max-w-[800px] lg:max-h-[650px] xl:max-w-[1500px] xl:max-h-[750px]">
      <Image src={image} width={1500} height={750} alt="big-image-news" className="h-full blur-[0.7px]" />
      <span className="absolute uppercase left-0 top-0 text-white z-10 bg-red-700 p-2">{categoryName}</span>
      <div className="p-2 absolute left-0 bottom-3 text-white z-10">
          <h2 className="text-md mb-2 sm:text-2xl md:text-3xl font-semibold">{headline}</h2>
          <h3 className="text-sm font-medium mt-2">{date}</h3>
      </div>
    </Link>
  )
}

export default NewsBigCard