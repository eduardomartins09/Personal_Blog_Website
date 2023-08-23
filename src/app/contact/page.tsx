import Image from "next/image"

import ContactEmail from "@/components/ContactEmail/ContactEmail"

const Contact = () => {
  
  return (
    <main className="px-5 sm:px-20 py-8 bg-white text-black mt-16 md:mt-0">
      <h1 className="text-5xl uppercase mb-4">Contact</h1>
      <div className="flex bg-light-white p-4 rounded-xl gap-4">
        <div className="my-auto hidden lg:block h-full">
          <Image src="/euMesmo.png" width={600} height={600} className="h-full object-cover rounded-full" alt="eduardo-image" />
        </div>
        <ContactEmail />
      </div>
      <div className="mt-4">
        <h2 className="text-lg">This blog is a communication channel that focuses on the dissemination of news, as well as national and international information.</h2>
      </div>
    </main>
  )
}

export default Contact