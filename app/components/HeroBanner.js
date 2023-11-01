import React from 'react'
import '../styles/HeroBanner.scss'
import Image from 'next/image'
import MainImage from '../assets/img/main-hero-banner.jpg'

function HeroBanner() {
  return (
    <div className='hero-banner'>
        <Image className='main-img' src={MainImage} width={1440}
      height={700}
      alt="Picture of the author"/>
    </div>
  )
}

export default HeroBanner