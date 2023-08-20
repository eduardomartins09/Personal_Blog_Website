import Link from "next/link"

import SearchBar from "./SearchBar"
import { navigationPlacesLinks } from "@/utils"

const Search = () => {

  return (
    <div className="p-6 bg-slate-950 text-white w-full flex items-center flex-col gap-6 sm:justify-between">
        <div className="hidden md:flex md:flex-row md:items-center md:gap-6 lg:gap-8">
          {navigationPlacesLinks.map((nav, idx) => (
            <Link href={nav.link} key={idx} className="text-xl hover:text-slate-800">
              {nav.name}
            </Link>
          ))}
        </div>
        <SearchBar />
    </div>
  )
}

export default Search