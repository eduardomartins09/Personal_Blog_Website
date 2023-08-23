import getBlogs from "@/actions/getBlogs"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import AdsCard from "@/components/GlobalComponents/Ads/AdsCard"
import NewsHorizontalCard from "@/components/News/NewsHorizontalCard"
import ShowMore from '@/components/ShowMore/ShowMore'

import { formartDateHome } from "@/utils"

export default async function BlogsHome({ searchParams }: { searchParams: { page: string, limit: string } }) {
  const page = parseInt(searchParams.page) || 1
  const limit = parseInt(searchParams.limit) || 8
  const currentPage = parseInt(searchParams.page)
 
  const { safeBlogs, totalCount } = await getBlogs(page, limit)
     
  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <div className="flex items-center gap-3 bg-light-white mb-4">
        <h1 className="bg-dark-black p-3 text-light-white text-sm sm:text-2xl font-bold">
          ALL BLOGS
        </h1>     
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
        <div className="hidden lg:block">
          <Ads />
        </div>
      </div> 
      <div className="grid items-center justify-center bg-light-white py-5 gap-8 mt-5 lg:hidden">
        <AdsCard image="/banner-ads.jpg" link="/contact" />
      </div>                    
    </main>
  )
}