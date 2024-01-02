import React from 'react'
import Image from 'next/image'
import '../styles/HeroSection.scss'

function HeroSection(props) {

    const sideImg = props.sideImg;
    const outstanding = props.outstanding;

    return (
        <div className={`${outstanding ? 'w-full' : 'w-1/2'}`}>
            {sideImg == 'right' ? (
                <div className='hero-section'>
                    <div className='hero-section-content md:flex hidden'>
                        <h2 className='font-bold text-xl mb-3'>{props.name}</h2>
                        <p>{props.description}</p>
                        <div className="icons"></div>
                    </div>
                    <Image className='main-img' src={props.image} width={1440}
                        height={700}
                        alt={props.description} />

                    <div className='hero-section-content flex md:hidden'>
                        <h2 className='font-bold text-xl mb-3'>{props.name}</h2>
                        <p>{props.description}</p>
                        <div className="icons"></div>
                    </div>

                </div>
            ) : (
                <div className='hero-section'>
                    <Image className='main-img' src={props.image} width={1440}
                        height={700}
                        alt={props.description} />

                    <div className='hero-section-content'>
                        <h2 className='font-bold text-xl mb-3'>{props.name}</h2>
                        <p>{props.description}</p>
                        <div className="icons"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeroSection