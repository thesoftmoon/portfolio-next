'use client'

import { Inter } from 'next/font/google'
import './globals.scss'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/context/AuthContext';
import 'material-symbols';
import { useRouter } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

/* export const metadata = {
  title: 'Portfolio Next',
  description: 'Example portfolio created in Next',
} */

export default function RootLayout({ children }) {

  const router = useRouter();

  const isMyRoute = router.pathname === '/admin';

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {isMyRoute &&
            <Navbar />
          }
          {children}
          {isMyRoute &&
            <Footer />
          }
        </AuthContextProvider>
      </body>
    </html>
  )
}
