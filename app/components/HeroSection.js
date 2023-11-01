import React from 'react'
import Image from 'next/image'
import '../styles/HeroSection.scss'

function HeroSection(props) {

    const title = 'Lorem, ipsum dolor.';
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo maxime culpa voluptatem eaque tenetur neque nostrum qui adipisci tempora tempore facere in itaque animi perspiciatis similique, fugit dolorum asperiores numquam?'

    const leftText = props.leftText;

    return (
        <div>
            {leftText ? (
                <div className='hero-section'>
                    <div className='hero-section-content md:flex hidden'>
                        <h2 className='font-bold text-xl mb-3'>{title}</h2>
                        <p>{text}</p>
                        <div className="icons"></div>
                    </div>
                    <Image className='main-img' src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fHww' width={1440}
                        height={700}
                        alt="Picture of the author" />

                    <div className='hero-section-content flex md:hidden'>
                        <h2 className='font-bold text-xl mb-3'>{title}</h2>
                        <p>{text}</p>
                        <div className="icons"></div>
                    </div>

                </div>
            ) : (
                <div className='hero-section'>
                    <Image className='main-img' src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fHww' width={1440}
                        height={700}
                        alt="Picture of the author" />

                    <div className='hero-section-content'>
                        <h2 className='font-bold text-xl mb-3'>{title}</h2>
                        <p>{text}</p>
                        <div className="icons"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeroSection