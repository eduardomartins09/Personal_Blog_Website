import { redirect } from "next/navigation"

import getBlogsByName from "@/actions/getBlogsByName"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import NewsCard from "@/components/News/NewsCard"
import ShowMore from "@/components/ShowMore/ShowMore"

const SearchPage = async ({ searchParams }: { searchParams: { search: string | undefined, page: string, limit: string } }) => {
  const page = parseInt(searchParams.page) || 1
  const limit = parseInt(searchParams.limit) || 8
  const currentPage = parseInt(searchParams.page) 
  const informedDescription = searchParams.search || redirect("/errors?error=You did not search anything")

  const { safeBlogs, totalCount } = await getBlogsByName(informedDescription, page, limit)
   
  return (
    <main className="p-8 bg-slate-800 text-white">
      <div className='bg-gray-700 p-4 mb-4'>
        <h1 className='text-2xl font-medium'>Buscando por: <span className="font-light">&apos;{informedDescription.toLowerCase()}&apos;</span></h1>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {safeBlogs.map((blog) => (
              <NewsCard
                image={blog.imageSrc} 
                headline={blog.name} 
                date={blog.createdAt} 
                linkId={blog.id} 
                notSwiper={true}
                key={blog.id}
              />
            ))}
          </div>
          <div>
            <ShowMore
              pageNumber={currentPage || 1}
              isNext={limit > safeBlogs.length}
              numberOfButtons={totalCount / limit + 1}
            />  
          </div>
        </div>
        <div>
          <Ads />
        </div>
      </div>    
    </main>
  )
}

export default SearchPage