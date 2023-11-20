'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '../styles/Events.scss';
import getCollectionData from '@/firebase/firestore/getCollectionData'



function Events() {

    const [eventsData, setEventsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            const  {result, error} = await getCollectionData('events');
            if(error){
                setError(error)
            }
            else {
                setEventsData(result)
            }
        };
        fetchData();
    },[])


    return (
        <div id='events'>
            <div className='px-5 bg-zinc-700'>
                <h1 className='title text-white'>Eventos</h1>
            </div>

            <div className='bg-zinc-700 flex flex-wrap'>
                {eventsData.map((event) => (
                    <div key={event.id} className='text-white event-container w-full sm:w-1/2 md:w-1/3 p-4'>
                        <div className="img-container">
                            <Image className='img-main' src={event.image} width={800}
                                height={800}
                                alt={event.name} />
                        </div>
                        <div className='txt-container'>
                            <p className='text-xl font-bold'>{event.name}</p>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Events