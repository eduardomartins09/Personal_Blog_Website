'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import SocialLinks from '../GlobalComponents/Links/SocialLinks'
import MenuNavbar from './MenuNavbar'
import MenuProfileNavbar from './MenuProfileNavbar'
import SearchBarNavbar from './SearchBarNavbar'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="px-8 py-6 bg-slate-950 sticky top-0 z-50 w-full">
        <nav className='text-white flex flex-col  sm:block'>
            <div className={`flex ${session ? 'flex-row gap-2' : 'flex-col sm:flex-row gap-4'} items-center justify-between`}>
                <div className='flex items-center gap-4'>
                    <AiOutlineMenu size={27} onClick={() => setNavOpen(!navOpen)} className="cursor-pointer" />
                    <Link href="/">
                        <h1 className='text-lg sm:text-xl'>Blog <span className='font-semibold text-2xl sm:text-3xl'>Eduardo M</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <MenuProfileNavbar />
                </div>
            </div>       
        </nav>

        {/* Menu */}
        {navOpen ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}

        <div className={navOpen ? 'fixed top-0 left-0 w-[300px] h-screen bg-slate-950 z-10 duration-300 text-white' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 text-white'}>          
            <AiOutlineClose className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-5 border-2 border-dark-purple cursor-pointer `} onClick={() => setNavOpen(!navOpen)} />
            <h2 className='text-3xl p-4 font-bold'>
                Eduardo M
            </h2>   
            <div className='px-4'>
                <SearchBarNavbar navOpen={navOpen} setNavOpen={setNavOpen} />    
            </div>
            <MenuNavbar navOpen={navOpen} setNavOpen={setNavOpen} />
        </div>
    </header>
  )
}

export default Navbar
