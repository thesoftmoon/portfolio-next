'use client'
import React, {useState, useEffect}from 'react'
import HeroSection from './HeroSection'
import getCollectionData from '@/firebase/firestore/getCollectionData';

function Team() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            const  {result, error} = await getCollectionData('team');
            if(error){
                setError(error)
            }
            else {
                setData(result)
            }
        };
        fetchData();
    },[])
  return (
    <div className='flex flex-wrap'>
        {data
        .sort((a, b) => a.order - b.order)
        .map((item)=>(
            <HeroSection outstanding={item.outstanding} key={item.order} description={item.description} name={item.name} image={item.image} sideImg={item.sideImg}/>
        ))}
    </div>
  )
}

export default Team