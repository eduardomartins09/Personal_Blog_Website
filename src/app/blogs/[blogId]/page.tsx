import getBlogsById from '@/actions/getBlogsById'
import getBlogs from '@/actions/getBlogs'
import getCommentByBlogId from '@/actions/getCommentByBlogId'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

import Ads from '@/components/GlobalComponents/Ads/Ads'
import NewsDetails from '@/components/News/NewsDetails'
import SwiperNews from '@/components/News/SwiperNews'
import CommentSection from '@/components/Comment/CommentSection'

interface IParams {
  blogId: string
}

const NewsDetailsPage = async ({ params }: {params: IParams}) => {
  const blog = await getBlogsById(params.blogId)
  const { safeBlogs } = await getBlogs(1, 20)
  const { safeComment } = await getCommentByBlogId(params.blogId)

  return (
    <main className='px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0'>
      <div className="grid lg:grid-cols-[minmax(0,_1fr)_350px] gap-8 ">
        <div>
          <NewsDetails 
            name={blog?.name}
            description={blog?.description}          
            createdAt={blog?.createdAt}
            imageSrc={blog?.imageSrc}
            categoryName={blog?.categoryName}
            linkId={blog?.id}
            userId={blog?.userId}
          />
          <CommentSection blogId={params.blogId} comments={safeComment} />
        </div>
        <Ads />
      </div>
      <div>
        <div className="mt-8 flex justify-between">
          <h2 className="text-2xl pb-1">See more</h2>
          <div className="flex gap-2">
            <AiOutlineArrowLeft size={30} className="cursor-pointer button-prev-slide" />
            <AiOutlineArrowRight size={30} className="cursor-pointer button-next-slide" />
          </div>
        </div>
        <hr />
        <SwiperNews data={safeBlogs} />
      </div>
    </main>
  )
}

export default NewsDetailsPage