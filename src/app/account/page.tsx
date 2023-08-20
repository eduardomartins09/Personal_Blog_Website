import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getSession } from "@/actions/getCurrentUser"

import ChangeUserInfo from "@/components/Profile/ChangeUserInfo"

const AccountPage = async () => {
  const session = await getSession()

  if (!session) redirect("/auth/login")

  return (
    <main className="p-8 bg-slate-800 text-white">
      <div className="flex flex-col items-center sm:flex-row gap-8">
        <div className="rounded-full-img w-48 h-fit max-h-56 overflow-hidden">
          <Image src={session?.user?.image || "https://res.cloudinary.com/dbiffor7h/image/upload/f_auto,q_auto/rvbjadkse4u66wotcbv0"} alt="profile-image" width={1000} height={1000} className='border-0 align-middle inline-block max-w-[100%] h-auto rounded-full' />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Name: <span className="text-lg">{session?.user?.name}</span></h2>
          <h2 className="text-xl font-semibold mb-8">Email: <span className="text-lg">{session?.user?.email}</span></h2>
          <Link href="/auth/change_password">
            <span className="text-2xl font-semibold text-red-500">Click here to change password</span>
          </Link>
        </div>
      </div>
      
      <ChangeUserInfo name={session?.user?.name} image={session?.user?.image} />
    </main>
  )
}

export default AccountPage