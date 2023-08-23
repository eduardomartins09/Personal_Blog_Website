import { redirect } from "next/navigation"

import getBlogsByCategory from "@/actions/getBlogsByCategory"
import getCategories from "@/actions/getCategories"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import ShowMore from '@/components/ShowMore/ShowMore'
import CustomFilter from "@/components/GlobalComponents/CustomFilter/CustomFilter"
import NewsBigCard from "@/components/News/NewsBigCard"
import NewsMainCard from "@/components/News/NewsMainCard"
import AdsCard from "@/components/GlobalComponents/Ads/AdsCard"

import { formartDateHome } from "@/utils"

interface IParams {
    categoryName: string
    page: string
    limit: string
}

const CategoryPage = async ({ params }: {params: IParams}) => {
  const page = parseInt(params.page) || 1
  const limit = parseInt(params.limit) || 8
  const categoryName = params.categoryName
  
  const currentPage = parseInt(params.page)
 
  const { safeBlogs, totalCount } = await getBlogsByCategory(categoryName, page, limit)

  const { categories } = await getCategories()
   
  if (safeBlogs.length === 0) redirect("/errors?error=Category not found")

  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <div className="flex items-center gap-3 bg-light-white mb-4">
        <h1 className="bg-dark-black p-3 text-light-white text-sm sm:text-2xl font-bold uppercase">
          {categoryName}
        </h1>     
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
        <div className="grid items-end justify-end mb-2">
          <CustomFilter title="Categories" options={categories} />
        </div>
        <div></div>
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


export default CategoryPage