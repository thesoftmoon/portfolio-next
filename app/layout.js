import { Inter } from 'next/font/google'
import './globals.scss'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio Next',
  description: 'Example portfolio created in Next',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
