"use client"

import Image from "next/image"
import { Fragment, useState } from "react"
import { useRouter } from "next/navigation"
import { Listbox, Transition } from "@headlessui/react"

import { CustomFilterProps } from "@/types"

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: { name: string }) => {    
    const newPathName = `/category/${e.name.toLowerCase()}`
    router.push(newPathName)
  }
  
  return (
    <div className="w-fit">
        <Listbox
          value={selected}
          onChange={(e) => {setSelected(e), handleUpdateParams(e)}}
        >
          <div className="relative w-fit z-10">
            <Listbox.Button className="relative w-full min-w-[187px] flex justify-between items-center cursor-pointer rounded-lg bg-gray-700 py-2 px-3 text-left shadow-md sm:text-sm border">
              <span className="block truncate capitalize">{selected.name}</span>
              <Image 
                src="/chevron-up-down.svg"
                width={20}
                height={20}
                className="ml-4 object-contain"
                alt="chevron-up-down"
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option 
                    key={option.name}
                    value={option}
                    className={({ active }) => `relative capitalize cursor-pointer select-none py-2 px-4 ${active ? 'bg-[#2B59FF] text-white' : 'text-gray-900'}`}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
    </div>
  )
}

export default CustomFilter