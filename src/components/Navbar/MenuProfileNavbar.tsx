'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'

import CustomButton from '../GlobalComponents/Buttons/CustomButton'

const MenuProfileNavbar = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <Menu as='div' className='relative'>
          <Menu.Button>
            {session?.user?.image ? (
              <div className='relative h-8 w-8 sm:h-10 sm:w-10'>
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name || "profile-image"}
                  className='inline-block border border-white rounded-full'
                  fill
                />
              </div>
            ) : (
              <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-700'>
                <svg
                  className='h-full w-full text-stone-700'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              </span>
            )}
          </Menu.Button>
          <Transition
            enter='transition duration-150 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-150 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Menu.Items className='bg-white absolute right-0 mt-1 flex w-60 sm:w-96 origin-top-right flex-col rounded-xl py-6 text-black shadow-lg focus:outline-none'>
              <div className='mb-2 flex gap-4 px-6 text-sm'>
                {session?.user?.image ? (
                  <div className='absolute h-10 w-10'>
                    <Image
                      src={session?.user?.image}
                      alt={session?.user?.name || "profile-image"}
                      className='inline-block border border-white rounded-full'
                      fill
                    />
                  </div>
                ) : (
                  <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
                    <svg
                      className='h-full w-full text-stone-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                  </span>
                )}
                <div className='ml-14 break-all'>
                  <p className='font-medium text-stone-800'>
                    {session?.user?.name || 'User name'}
                  </p>
                  <p className='text-stone-600'>{session?.user?.email}</p>
                </div>
              </div>
              {session?.user?.role === "admin" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/blogs/create-blog'
                      className={clsx(
                        active && 'bg-stone-700/50',
                        'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-600'
                      )}
                    >
                      <MdOutlineCreate className='h-5 w-5' />
                      <span>Create New Blog</span>
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href='/account'
                    className={clsx(
                      active && 'bg-stone-700/50',
                      'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-600'
                    )}
                  >
                    <AiFillSetting className='h-5 w-5' />
                    <span>Manage Account</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active && 'bg-stone-700/50',
                      'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-600'
                    )}
                    onClick={() => signOut()}
                  >
                    <AiOutlineLogout className='h-5 w-5' />
                    <span>Sign Out</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Link href="/auth/login">                  
          <div className='relative h-8 w-8'>
            <Image
              src={"https://res.cloudinary.com/dbiffor7h/image/upload/f_auto,q_auto/rvbjadkse4u66wotcbv0"}
              alt={"profile-image"}
              className='inline-block border-2 border-black rounded-full p-1'
              fill
            />
          </div>                
        </Link>
      )}
    </>
  )
}

export default MenuProfileNavbar