'use client'
import React, { useState, useEffect } from 'react';
import '../styles/HeroBanner.scss';
import Image from 'next/image';
import getCollectionData from '@/firebase/firestore/getCollectionData';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function HeroBanner() {

  const [heroHeaderData, setHeroHeaderData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { result, error } = await getCollectionData('hero_headers');
      if (error) {
        setError(error)
      }
      else {
        setHeroHeaderData(result)
      }
    };
    fetchData();
  }, [])

  if (heroHeaderData.length > 0) {
    return (
      <Swiper spaceBetween={0}
        scrollbar={{ draggable: true }}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        {heroHeaderData.map((heroHeader) => (
          <SwiperSlide key={heroHeader.id}>
            <div className='hero-banner'>
              <Image className='main-img' src={heroHeader.image} width={1440}
                height={700}
                alt="Picture of the author" />

              <div className="txt">
                <h1 className="text-5xl font-bold text-white pb-5">{heroHeader.name}</h1>
                <p className='block text-gray-700 font-bold mb-2 text-white pb-5'>{heroHeader.description}</p>
                <Link className='bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-2 px-4 rounded-lg' href='#'>{heroHeader.name}</Link>
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    )
  }
  return (
    <div></div>
  )

}

export default HeroBanner