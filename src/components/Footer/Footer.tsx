import Link from "next/link"
import getCategories from "@/actions/getCategories"

import SocialLinks from "../GlobalComponents/Links/SocialLinks"

const Footer = async () => {
  const { categories } = await getCategories()

  return (
    <footer className="p-8 bg-slate-950 text-white w-full">
      <div className="grid lg:grid-cols-2 items-center">
        <div className='py-8'>
          <div className="lg:px-8 mb-8">
            <div className='flex items-center text-3xl p-2 tracking-wider rounded-full w-fit bg-cyan-400 text-black'>
              <small className='font-bold'>&#x276E;</small>
              <small className='font-bold'>/</small>
              <small className='font-bold'>&#x276F;</small>
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold'>
              <small className='text-base md:text-xl font-semibold'>Blog </small>Eduardo M
            </h1>
            <h2 className="text-2xl font-semibold">du.ms1@hotmail.com</h2>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-2">Categories:</h2>
          <h3 className="uppercase text-xl">
            {categories.map((category) => (
              <>
                {category.name[0] === "p" 
                  ? (
                    <Link href={`/category/${category.name}`}> 
                      <span key={category.id} className="hover:text-gray-800">{category.name} </span>
                    </Link>
                  )
                  : (
                    <Link href={`/category/${category.name}`}> 
                      / <span key={category.id} className="hover:text-gray-800">  {category.name} </span>
                    </Link>
                  )
                }
              </>            
            ))}
          </h3>
        </div>
      </div>
      <div className="py-6 flex justify-end">
        <SocialLinks />
      </div>
      <hr />
      <div className="grid gap-2 sm:flex sm:justify-between items-center p-2">
        <h2 className="text-sm md:text-lg">Eduardo Martins © All rights reserved</h2>
        <h2 className="text-sm md:text-lg">Website Creation: <Link href="https://eduardomartins09.github.io/Meu_Portifolio/" className="hover:text-slate-800">Eduardobr09</Link></h2>
      </div>
    </footer>
  )
}

export default Footer