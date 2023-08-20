import Image from 'next/image'

const Banner = () => {
  return (
    <section className="bg-[url('/banner.png')] bg-cover bg-center">
        <div className="flex justify-between">
            <div className='py-16 px-8'>
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
            <div className="px-8 pt-8 hidden md:block">
                <Image className="" src="/euMesmoSemFundo.png" width={350} height={1000} alt="eduardo-image" />
            </div>
        </div>
    </section>
  )
}

export default Banner