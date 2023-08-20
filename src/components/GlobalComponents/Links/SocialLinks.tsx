import Link from 'next/link'

import { ImInstagram, ImGithub, ImLinkedin  } from 'react-icons/im'
import { BsPersonVcard } from 'react-icons/bs'

const SocialLinks = () => {
  return (
    <ul className='flex gap-2 list-none items-center justify-center'>
      <li>
        <Link href="https://www.instagram.com/eduardobr09/" target='_blank'>
          <ImInstagram size={40} className='bg-slate-700 rounded-xl p-2 hover:bg-slate-800' />
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com/in/eduardo-martins-santos/" target='_blank'>
          <ImLinkedin size={40} className='bg-slate-700 rounded-xl p-2 hover:bg-slate-800' />
        </Link>
      </li>
      <li>
        <Link href="https://github.com/eduardomartins09" target='_blank'>
          <ImGithub size={40} className='bg-slate-700 rounded-xl p-2 hover:bg-slate-800' />
        </Link>
      </li>
      <li>
        <Link href="https://eduardomartins09.github.io/Meu_Portifolio/" target='_blank'>
          <BsPersonVcard size={40} className='bg-slate-700 rounded-xl p-2 hover:bg-slate-800' />
        </Link>
      </li>      
    </ul>
  )
}

export default SocialLinks