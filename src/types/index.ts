import { Blog, User, Comment } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
  role?: string  | null
}

export type SafeBlogs = Omit<Blog, "createdAt"> & {
  createdAt: string
}

export type SafeComments = Omit<Comment, "createdAt"> & {
  createdAt: string
}

interface OptionProps {
  id: string
  name: string
}

export interface CustomFilterProps {
  title: string
  options: OptionProps[]
}

export interface CommentSectionProps {
  blogId?: string
  comments: SafeComments[]
}

export interface InitialStateCommentSectionProps {
  text: string
  name?: string | null
  id?: string
  image?: string | null
  blogId?: string
}

export interface InitialStateCreateAndEditProps {
  name: string
  description: string
  imageSrc: string
  categoryName: string
}

export interface NewsCardProps {
  image: string
  headline: string
  date: string
  linkId: string
  notSwiper: boolean
}

export interface NewsDetailsProps {
  name?: string
  description?: string
  createdAt?: string
  imageSrc?: any
  categoryName?: string | null
  linkId?: string
  userId?: string
}


export interface NewsEditProps {
  name?: string
  description?: string
  imageSrc?: any
  blogId?: string
  categoryName?: string | null
}