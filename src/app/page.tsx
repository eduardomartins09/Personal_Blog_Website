import Ads from "@/components/GlobalComponents/Ads/Ads"
import NewsCard from "@/components/News/NewsCard"
import SeeMoreNews from "@/components/GlobalComponents/Buttons/SeeMoreNews"

import getBlogs from "../actions/getBlogs"

export default async function Home({ searchParams }: { searchParams: { page: string, limit: string } }) {
  const page = 1
  const limit = 8 
  
  const { safeBlogs } = await getBlogs(page, limit)
     
  return (
    <main className="p-8 bg-slate-800 text-white">
      <div className='bg-gray-700 p-4 mb-4'>
        <h1 className='text-2xl font-medium'>Recently</h1>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
        <section className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
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
        </section>
        <section>
          <Ads />
        </section>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_300px] gap-8">
        <SeeMoreNews /> 
        <div></div>    
      </div>
    </main>
  )
}

