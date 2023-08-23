'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import { navigationPlacesLinks } from '@/utils'

import MenuNavbar from './MenuNavbar'
import MenuProfileNavbar from './MenuProfileNavbar'
import SearchBarVisibleNavbar from './SearchBarVisibleNavbar'
import SearchbarMenuNavbar from './SearchbarMenuNavbar'

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className='relative w-full'>
        <nav className="text-black bg-light-white-two border-b-[1px] border-b-[rgba(0, 0, 0, 0.17)] fixed top-0 z-50 w-full">
            <div className={`flex flex-wrap items-center justify-evenly sm:justify-between gap-2 px-5 sm:px-20 py-4`}>
                <div className='flex items-center gap-4'>
                    <AiOutlineMenu size={27} onClick={() => setNavOpen(!navOpen)} className="cursor-pointer" />
                    <h2 className='hidden sm:block text-lg uppercase lg:text-2xl'>Menu</h2>
                </div>
                <Link href="/" className=''>
                    <h1 className='text-lg sm:text-2xl'>Blog <span className='font-semibold text-xl sm:text-3xl'>Eduardo M</span></h1>
                </Link>
                <div className='hidden sm:flex items-center gap-2'>
                    <MenuProfileNavbar />
                    <div className=''>
                        <SearchBarVisibleNavbar />                  
                    </div>
                </div>
                <div className='sm:hidden'>
                    <MenuProfileNavbar />
                </div>
                <div className='sm:hidden'>
                    <SearchBarVisibleNavbar />                  
                </div>
            </div>
        </nav>               
   
        <div className="hidden px-20 pt-8 pb-5 w-full md:flex items-center flex-col gap-6 sm:justify-between border-t-[1px] border-t-[rgba(0, 0, 0, 0.17)] mt-16">
            <div className="md:flex md:flex-row md:items-center md:gap-6 lg:gap-8">
                {navigationPlacesLinks.map((nav, idx) => (
                    <Link href={nav.link} key={idx} className="text-lg hover:text-gray-400">
                        {nav.name}
                    </Link>
                ))}
            </div>
        </div>
         

        {/* Menu */}
        {navOpen ? <div className='bg-black/80 fixed w-full h-screen z-50 top-0 left-0'></div> : ''}

        <div className={navOpen ? 'fixed top-0 left-0 w-[300px] h-screen bg-light-white-two z-50 duration-300 text-black' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-light-white-two z-50 duration-300 text-white'}>          
            <AiOutlineClose className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-5 border-2 border-dark-purple cursor-pointer `} onClick={() => setNavOpen(!navOpen)} />
            <h2 className='text-3xl p-4 font-bold'>
                Eduardo M
            </h2>   
            <div className='px-4'>
                <SearchbarMenuNavbar navOpen={navOpen} setNavOpen={setNavOpen} />    
            </div>
            <MenuNavbar navOpen={navOpen} setNavOpen={setNavOpen} />
        </div>   
    </header>
  )
}

export default Navbar
