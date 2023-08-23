import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import NewsCreateCard from '@/components/News/NewsCreateCard'

const CreateBlog = async () => {
  const session = await getSession()

  if (session?.user?.role !== "admin") redirect("/errors?error=Page Not Found")
  
  return (
    <main className='px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0'>
      <NewsCreateCard />
    </main>
  )
}

export default CreateBlog