import React from 'react'
import Article from '../components/Article'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'

function page() {
    return (
        <div>
            <Navbar/>
            <HeroBanner/>
            <Article title={'Este es el componente Article'} text={'Este es el texto del componente Article'}/>
        </div>
    )
}

export default page