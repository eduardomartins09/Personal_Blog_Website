import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import getBlogsById from "@/actions/getBlogsById"
import NewsEditCard from "@/components/News/NewsEditCard"

interface IParams {
  editId: string, 
}

const EditPage = async ({ params }: {params: IParams}) => {
  const session = await getSession()
  const blog = await getBlogsById(params.editId)

  if (session?.user?.role !== "admin") redirect("/errors?error=Page Not Found")
     
  return (
    <main>
      <NewsEditCard
        name={blog?.name}
        description={blog?.description}
        blogId={blog?.id}
        imageSrc={blog?.imageSrc}
        categoryName={blog?.categoryName}
      />
    </main>
  )
}

export default EditPage