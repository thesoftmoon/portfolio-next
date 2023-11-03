'use client'

import React from 'react';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

async function addDataToFirestore(name, email, message){
    try {
        const docRef = await addDoc(collection(db, 'messages'), {
            name: name,
            email: email,
            message: message,
        });
        console.log('Document written with ID: ', docRef.id)
        return true;
    } catch(error){
        console.error('Error adding document ', error);
        return false;
    }
} 

function TestForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const added = await addDataToFirestore(name, email, message);
        if(added){
            setName('');
            setEmail('');
            setMessage('');

            alert('data added to firestore');
        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-5xl font-bold m-10">
                Add data to firebase
            </h1>

            <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
                <div className="mb-4">
                    <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                        Name:
                    </label>
                    <input type="text"
                    id='name'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
                        Email:
                    </label>
                    <input type="text"
                    id='email'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className='block text-gray-700 font-bold mb-2'>
                        Message:
                    </label>
                    <textarea type="text"
                    id='message'
                    rows={5}
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}></textarea>
                </div>

                <div className="text-center">
                    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
                        Submit message
                    </button>
                </div>
            </form>
        </main>
    )
}

export default TestForm