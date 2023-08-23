import { redirect } from "next/navigation"

import getBlogsByName from "@/actions/getBlogsByName"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import ShowMore from "@/components/ShowMore/ShowMore"
import NewsHorizontalCard from "@/components/News/NewsHorizontalCard"

import { formartDateHome } from "@/utils"

const SearchPage = async ({ searchParams }: { searchParams: { search: string | undefined, page: string, limit: string } }) => {
  const page = parseInt(searchParams.page) || 1
  const limit = parseInt(searchParams.limit) || 8
  const currentPage = parseInt(searchParams.page) 
  const informedDescription = searchParams.search || redirect("/errors?error=You did not search anything")

  const { safeBlogs, totalCount } = await getBlogsByName(informedDescription, page, limit)
   
  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black">
      <div className="flex items-center gap-3 bg-light-white mt-16 md:mt-0">
        <div className="bg-dark-black p-3 text-light-white text-2xl font-bold">
          BUSCANDO POR:
        </div>
        <span className="uppercase text-lg">&apos;{informedDescription}&apos;</span>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8">
        <div>
          <div className="grid gap-8 mt-4">
            {safeBlogs.map((blog) => (   
              <NewsHorizontalCard key={blog.id} link={blog.id} image={blog.imageSrc} headline={blog.name} date={formartDateHome(blog.createdAt)} />
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