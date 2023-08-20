import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import NewsCreateCard from '@/components/News/NewsCreateCard'

const CreateBlog = async () => {
  const session = await getSession()

  if (session?.user?.role !== "admin") redirect("/errors?error=Page Not Found")
  
  return (
    <main className='py-12 px-8 bg-slate-800 text-white'>
      <NewsCreateCard />
    </main>
  )
}

export default CreateBlog