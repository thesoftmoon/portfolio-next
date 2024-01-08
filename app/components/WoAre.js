'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import getCollectionData from '@/firebase/firestore/getCollectionData'

function WoAre() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { result, error } = await getCollectionData('services');
            if (error) {
                setError(error)
            }
            else {
                setData(result)
            }
        };
        fetchData();
    }, [])
    return (
        <div className='my-20' id='wo-are'>
            <div className='mx-5'>
                <h1 className='title'>Quienes somos</h1>
            </div>

            <div className='flex md:flex-row flex-col'>
                {data.map((item) => (
                    <div className='basis-full md:basis-2/6 service-container' key={item.id}>
                        <div className="justify-center flex mb-4">
                            <Image className='icon-img' src={item.image} width={100}
                                height={100}
                                alt={'test image'} />
                        </div>
                        <div className='service-text'>
                            <h4 className='font-bold text-xl mb-3'>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WoAre