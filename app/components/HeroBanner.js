import React from 'react'
import '../styles/HeroBanner.scss'
import Image from 'next/image'

function HeroBanner() {
  return (
    <div className='hero-banner'>
        <Image className='main-img' src='/img/main-hero-banner.jpg' width={1440}
      height={700}
      alt="Picture of the author"/>
    </div>
  )
}

export default HeroBanner