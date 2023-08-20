import { redirect } from "next/navigation"

import getBlogsByCategory from "@/actions/getBlogsByCategory"
import getCategories from "@/actions/getCategories"

import Ads from "@/components/GlobalComponents/Ads/Ads"
import NewsCard from "@/components/News/NewsCard"
import ShowMore from '@/components/ShowMore/ShowMore'
import CustomFilter from "@/components/GlobalComponents/CustomFilter/CustomFilter"

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
    <main className="p-8 bg-slate-800 text-white">
      <div className='bg-gray-700 p-4 mb-4'>
        <h1 className='text-2xl font-medium capitalize'>{categoryName}</h1>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
        <div className="grid items-end justify-end mb-2">
          <CustomFilter title="Categories" options={categories} />
        </div>
        <div></div>
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


export default CategoryPage