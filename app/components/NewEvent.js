'use client'

import React from 'react';
import { db, imageDb } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { v4 } from 'uuid';

async function addDataToFirestore(name, image, description) {
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: name,
            image: image,
            description: description,
        });
        console.log('Document written with ID: ', docRef.id)
        return true;
    } catch (error) {
        console.error('Error adding document ', error);
        return false;
    }
}

function NewEvent() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleUpload = (e) => {
        console.log(e.target.files[0]);
        const img = ref(imageDb, `imgs/${v4()}`);
        uploadBytes(img, e.target.files[0]).then(data => {
            console.log(data, 'img');
            getDownloadURL(data.ref).then(val => {
                setImage(val);
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFirestore(name, image, description);
        if (added) {
            setName('');
            setImage('');
            setDescription('');
            alert('data added to firestore');
        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-5">
            <h1 className="text-5xl font-bold m-10">
                Añadir nuevo evento
            </h1>

            <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
                <div className="mb-4">
                    <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                        Nombre:
                    </label>
                    <input type="text"
                        id='name'
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className='block text-gray-700 font-bold mb-2'>
                        Imagen:
                    </label>
                    <input type="file"
                        id='image'
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        onChange={(e) => handleUpload(e)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className='block text-gray-700 font-bold mb-2'>
                        Descripcion evento:
                    </label>
                    <textarea type="text"
                        id='message'
                        rows={5}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="text-center">
                    <button type='submit' className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-2 px-4 rounded-lg">
                        Subir evento
                    </button>
                </div>
            </form>
        </main>
    )
}

export default NewEvent