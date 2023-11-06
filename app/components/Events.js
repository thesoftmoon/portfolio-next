'use client'

import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import '../styles/Events.scss';

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'events'))

    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });
    return data;
}

function Events() {

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setEventsData(data);
            console.log(data)

        }
        fetchData();
    }, []);

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