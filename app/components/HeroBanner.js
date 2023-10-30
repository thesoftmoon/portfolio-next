import React from 'react'
import '../styles/HeroBanner.scss'
import Image from 'next/image'

function HeroBanner() {
  return (
    <div className='hero-banner'>
        <Image className='main-img' src="https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?auto=format&fit=crop&q=80&w=2946&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={1440}
      height={700}
      alt="Picture of the author"/>
    </div>
  )
}

export default HeroBanner