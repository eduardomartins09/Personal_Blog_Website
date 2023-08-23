import Link from "next/link"
import Image from "next/image"

import getBlogsByCategory from "@/actions/getBlogsByCategory"
import getBlogs from "../actions/getBlogs"

import { formartDateHome } from "@/utils"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import SeeMoreNews from "@/components/GlobalComponents/Buttons/SeeMoreNews"
import AdsCard from "@/components/GlobalComponents/Ads/AdsCard"
import NewsBigCard from "@/components/News/NewsBigCard"
import NewsMainCard from "@/components/News/NewsMainCard"
import NewsCategoriesHomeCard from "@/components/News/NewsCategoriesHomeCard"

export default async function Home({ searchParams }: { searchParams: { page: string, limit: string } }) {
  const page = 1
  const limit = 7
  
  const { safeBlogs } = await getBlogs(page, limit)

  const resSport = await getBlogsByCategory('sport', page, limit)
  const safeBlogsSports = resSport.safeBlogs

  const resCulture = await getBlogsByCategory('culture', page, limit)
  const safeBlogsCulture = resCulture.safeBlogs

  const resHealth = await getBlogsByCategory('health', page, limit)
  const safeBlogsHealth = resHealth.safeBlogs

  const resInternacional = await getBlogsByCategory('internacional', page, limit)
  const safeBlogsInternacional = resInternacional.safeBlogs
  
  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black">
      <div className="flex items-center gap-3 mt-16 md:mt-0">
        <div className="bg-dark-black text-light-white p-3 4] text-2xl font-bold">
          TRENDING
        </div>
        <p className="text-lg font-semibold lg:text-xl">
          Most recent blogs
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8">
        <div>
          <div>
            <div className="flex">
              <NewsBigCard link={safeBlogs[2].id} image={safeBlogs[2].imageSrc} categoryName={safeBlogs[2].categoryName} headline={safeBlogs[2].name} date={formartDateHome(safeBlogs[2].createdAt)} />
            </div>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-8 mt-20">
              {safeBlogs.map((blog) => (
                <>
                  {safeBlogs[2] !== blog && (
                    <NewsMainCard key={blog.id} link={blog.id} image={blog.imageSrc} categoryName={blog.categoryName} headline={blog.name} date={formartDateHome(blog.createdAt)} />
                  )}
                </>
              ))}    
            </div>
          </div>  
        </div>       
        <div>
          <Ads />
        </div>
      </div>
      <div className="flex items-center gap-3 text-black mt-10">
        <div className="bg-dark-black p-3 text-light-white text-2xl font-bold">
          TRENDING CATEGORIES
        </div>
        <p className="text-lg font-semibold lg:text-xl">
          Most recent blogs
        </p>
      </div>  
      <div className="grid lg:grid-cols-4 gap-8 mt-10">
        <div>
          <h2 className="text-white mb-2 bg-red-700 uppercase p-2">{safeBlogsSports[0].categoryName}</h2>
          {safeBlogsSports.map((blog) => (
            <NewsCategoriesHomeCard key={blog.id} link={blog.id} image={blog.imageSrc} categoryName={blog.categoryName} headline={blog.name} date={formartDateHome(blog.createdAt)} isFirst={safeBlogsSports[0] === blog} />
          ))}
        </div>
        <div>
          <h2 className="text-white mb-2 bg-red-700 uppercase p-2">{safeBlogsCulture[0].categoryName}</h2>
          {safeBlogsCulture.map((blog) => (
            <NewsCategoriesHomeCard key={blog.id} link={blog.id} image={blog.imageSrc} categoryName={blog.categoryName} headline={blog.name} date={formartDateHome(blog.createdAt)} isFirst={safeBlogsCulture[0] === blog} />
          ))}
        </div>
        <div>
          <h2 className="text-white mb-2 bg-red-700 uppercase p-2">{safeBlogsHealth[0].categoryName}</h2>
          {safeBlogsHealth.map((blog) => (
            <NewsCategoriesHomeCard key={blog.id} link={blog.id} image={blog.imageSrc} categoryName={blog.categoryName} headline={blog.name} date={formartDateHome(blog.createdAt)} isFirst={safeBlogsHealth[0] === blog} />
          ))}
        </div>
        <div>
          <h2 className="text-white mb-2 bg-red-700 uppercase p-2">{safeBlogsInternacional[0].categoryName}</h2>
          {safeBlogsInternacional.map((blog) => (
            <NewsCategoriesHomeCard key={blog.id} link={blog.id} image={blog.imageSrc} categoryName={blog.categoryName} headline={blog.name} date={formartDateHome(blog.createdAt)} isFirst={safeBlogsInternacional[0] === blog} />
          ))}
        </div>        
      </div>
      <SeeMoreNews />
      <div className="grid items-center justify-center bg-light-white py-5 gap-8 mt-5">
        <AdsCard image="/banner-ads.jpg" link="/contact" />
      </div>                    
    </main>
  )
}
