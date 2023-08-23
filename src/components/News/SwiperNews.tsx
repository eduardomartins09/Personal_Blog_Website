'use client'

import NewsSwiperCard from "./NewsSwiperCard"

// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { SafeBlogs } from "@/types"

interface SwiperNewsProps {
    data: SafeBlogs[]
}

const SwiperNews = ({ data }: SwiperNewsProps) => {
  return (
    <section>
      <Swiper
        modules={[Navigation]}
        navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
        }}
        spaceBetween={30}
        breakpoints={{
            300: {
                slidesPerView: 1
            },
            540: {
                slidesPerView: 2
            },
            810: {
                slidesPerView: 3
            },
            1300: {
                slidesPerView: 4
            }
        }}  
      >
        <div>
            {data.map((blog) => (
                <SwiperSlide key={blog.id}>
                    <NewsSwiperCard  
                        image={blog.imageSrc} 
                        headline={blog.name} 
                        date={blog.createdAt} 
                        linkId={blog.id} 
                        notSwiper={false}
                        key={blog.id} 
                    />
                </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </section>
  )
}

export default SwiperNews