import './globals.css'
import type { Metadata } from 'next'

import { Lato } from 'next/font/google'

import Provider from '@/context/provider'

import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import Banner from '@/components/Banner/Banner'
import Search from '@/components/Search/Search'

const lato = Lato({
  weight: ['100', '300' , '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eduardo M',
  description: 'Esse blog é um canal de comunicação que tem como foco a divulgação de notícias, bem como informações nacionais e internacionais.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body className={lato.className}>
        <noscript>
          <div className="alert alert-warning text-center">
            <h1>Seu navegador está com os scripts desabilitados!</h1>
            <p>Para melhor funcionamento do site, habilite-os.</p>
          </div>
        </noscript>
        <Provider>
          <Navbar />        
          <hr />
          <Banner />
          <hr />
          <Search />
          <hr />
          {children}
          <hr />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
