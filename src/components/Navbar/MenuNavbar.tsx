'use client'

import { useState, SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/navigation'

import { BsChevronDown, BsImageFill, BsReverseLayoutTextSidebarReverse, BsPerson } from "react-icons/bs"
import { RiDashboardFill } from "react-icons/ri"

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
        <ul className="mt-5">
            {Menus.map((menu, index) => (
                <div key={index} className='border-y-[1px] border-y-[rgba(0, 0, 0, 0.17)]'>
                    <li className={`text-gray-500 text-sm flex items-center gap-x-4 cursor-pointer px-4 py-3 hover:bg-gray-600 hover:text-white rounded-md`} onClick={() => goToSomePlace(`${menu.submenu ? "not" : menu.goTo}`)}>
                        <span className="text-2xl block float-left">
                            {menu.icon ? menu.icon : <RiDashboardFill />}
                        </span>
                        <span className={`text-base font-semibold flex-1 duration-200 ${!navOpen && "hidden"}`}>
                            {menu.title}
                        </span>
                        {menu.submenu && navOpen && (
                            <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                        )}
                    </li>
                    {menu.submenu && submenuOpen && navOpen && (
                        <ul>
                            {menu.submenuItems.map((submenuItem, index) => (
                                <li key={index} className={`text-gray-500 uppercase text-sm font-semibold flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-600 hover:text-white rounded-md`} onClick={() => goToSomePlace(`${menu.submenuItems ? submenuItem.goTo : ""}`)}>
                                    {submenuItem.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </ul>
    </nav>
  )
}

export default MenuNavbar