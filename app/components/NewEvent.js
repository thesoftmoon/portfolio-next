'use client'

import React, { useState, useEffect } from 'react';
import addData from '@/firebase/firestore/addData';
import addImage from '@/firebase/firestore/addImage';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function NewEvent() {

    const {user} = useAuthContext();
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (user == null) router.push("/sign-in")
    }, [user])

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = toast.loading("Subiendo datos...")
        // Better to store in local variable than state...
        let imageUrl = '';

        if (file) {
            try {
                const { result, error } = await addImage('events', file)
                if (error) {
                    console.log('error uploading the image: ' + error)
                } else {
                    console.log('Image uploaded, the url is: ' + result);
                    imageUrl = result;
                }
            } catch (error) {
                console.log('error uploading the image: ' + error)
            }
        }

        const data = {
            name: name,
            image: imageUrl,
            description: description,
        }

        const { result, error } = await addData('events', data)

        if (error) {
            console.log('Error:' + error)
        }
        if (result) {
            toast.update(notification, { render: "Datos enviados", type: "success", isLoading: false, autoClose: 1000 });
            console.log('Data stored')
            setName('')
            setDescription('')
            setFile(null)
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
                        onChange={handleFileChange}
                    />
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

            <ToastContainer />
        </main>
    )
}

export default NewEvent