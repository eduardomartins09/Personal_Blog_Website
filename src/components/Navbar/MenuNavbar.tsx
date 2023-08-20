'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/navigation'

import { BsChevronDown, BsImageFill, BsReverseLayoutTextSidebarReverse, BsPerson } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri"

import SocialLinks from '../GlobalComponents/Links/SocialLinks'

interface MenuNavBarProps {
    navOpen: boolean
    setNavOpen: Dispatch<SetStateAction<boolean>>   
}

const MenuNavbar = ({ navOpen, setNavOpen }: MenuNavBarProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  
  const router = useRouter()

  const goToSomePlace = (toGo: string) => {
    if (toGo === "not") return
    router.push(toGo)
    setNavOpen(!navOpen)
    setSubmenuOpen(false)
  }

  const Menus = [
    { title: "Home", goTo: "/" },  
    {
      title: "News",
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: "policy", goTo: "/category/policy" },
        { title: "culture", goTo: "/category/culture" },
        { title: "health", goTo: "/category/health" },
        { title: "sport", goTo: "/category/sport" },
        { title: "information", goTo: "/category/information" },
        { title: "nacional", goTo: "/category/nacional" },
        { title: "internacional", goTo: "/category/internacional" },
      ],
    },
    { title: "Contact", goTo: "/contact", icon: <BsImageFill /> },
    { title: "Account", goTo: "/account", icon: <BsPerson /> },
  ]

  return (
    <nav>               
        <ul className="pt-2 px-4">
            {Menus.map((menu, index) => (
                <div key={index}>
                    <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2  hover:bg-light-white rounded-md mt-3`} onClick={() => goToSomePlace(`${menu.submenu ? "not" : menu.goTo}`)}>
                        <span className="text-2xl block float-left">
                            {menu.icon ? menu.icon : <RiDashboardFill />}
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!navOpen && "hidden"}`}>
                            {menu.title}
                        </span>
                        {menu.submenu && navOpen && (
                            <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                        )}
                    </li>
                    {menu.submenu && submenuOpen && navOpen && (
                        <ul>
                            {menu.submenuItems.map((submenuItem, index) => (
                                <li key={index} className={`text-gray-300 uppercase text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md`} onClick={() => goToSomePlace(`${menu.submenuItems ? submenuItem.goTo : ""}`)}>
                                    {submenuItem.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </ul>
        <div className='px-4 my-8 mx-auto'>
            <SocialLinks />
        </div>
    </nav>
  )
}

export default MenuNavbar