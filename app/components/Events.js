'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'messages'))

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
        <div>
            <div className='px-5 bg-zinc-700'>
                <h1 className='title text-white'>Quienes somos</h1>
            </div>

            <div className='bg-zinc-700'>
                {eventsData.map((event) => (
                    <div key={event.id} className='mb-4 text-white'>
                        <p className='text-xl font-bold'>{event.name}</p>
                        <p>{event.email}</p>
                        <p>{event.message}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Events