'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '../styles/Events.scss';
import getCollectionData from '@/firebase/firestore/getCollectionData'
import Link from 'next/link';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import editData from '@/firebase/firestore/editData';
import addImage from '@/firebase/firestore/addImage';

function AdminEvents() {
    const [eventsData, setEventsData] = useState([]);
    const [error, setError] = useState(null);

    const [modalData, setModalData] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [eventData, setEventData] = useState();
    const [file, setFile] = useState(null);
    const [updated, setUpdated] = useState(false);

    const openModal = (data) => {
        setModalData(data)
    }

    const closeModal = () => {
        setModalData(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            const { result, error } = await getCollectionData('events');
            if (error) {
                setError(error)
            }
            else {
                setEventsData(result)
                setUpdated(false);
            }
        };
        fetchData();
    }, [updated])

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage)
    }

    const handleUpdate = async (e) => {
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

        const newData = {
            // add a fiel only if they exist, this code is named "short circuit evaluation" and the ... are the spread operator, they add the data to the new object
            ...(name && { name }),
            ...(imageUrl && { image: imageUrl }),
            ...(description && { description }),
        };
        console.log('New Data:', newData)
        const { result, error } = await editData('events', `${modalData.id}`, newData);
        if (error) {
            console.error('Error al actualizar datos:', error);
        }
        else {
            console.log('Datos actualizados correctamente');
            closeModal();
            toast.update(notification, { render: "Datos enviados", type: "success", isLoading: false, autoClose: 1000 });
            console.log('Data Updated')
        }
        setName('');
        setDescription('');
        setFile(null);
        setUpdated(true);

    };
    return (
        <div>
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

                        <div>
                            {/* <Link className='edit-btn' href={`/admin/events/edit-event/${event.id}`}>Editar Evento</Link> */}
                            <button className='edit-btn' onClick={() => openModal(event)}>Abrir Modal</button>
                        </div>
                        {modalData &&
                            <Modal onClose={closeModal}>
                                <main className="flex flex-col items-center p-5">
                                    <div className='text-center mb-5'>
                                        <h1 className="text-5xl font-bold text-black">
                                            Editar evento
                                        </h1>
                                        <h2 className='text-black'>con id: {modalData.id}</h2>
                                    </div>
                                    {/* <h1>aca va la form del evento : {params.eventId}</h1> */}
                                    <form onSubmit={handleUpdate} className='w-80 mx-auto p-4 bg-white shadow-md rounded-lg'>
                                        <div className="mb-4">
                                            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                                                Nombre:
                                            </label>
                                            <input type="text"
                                                id='name'
                                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                                value={name}
                                                placeholder={modalData ? modalData.name : 'cargando...'}
                                                onChange={(e) => setName(e.target.value)} />
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
                                                placeholder={modalData ? modalData.description : 'cargando...'}
                                                onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                        {modalData && (
                                            <div className='mb-4'>
                                                <p className='block text-gray-700 font-bold mb-2'>Imagen actual</p>
                                                <Image className='img-main' src={modalData.image} width={500}
                                                    height={500}
                                                    alt={modalData.name} />
                                            </div>
                                        )
                                        }

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

                                        <div className="text-center">
                                            <button type='submit' className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-2 px-4 rounded-lg">
                                                Actualizar evento
                                            </button>
                                        </div>
                                    </form>


                                </main>
                            </Modal>
                        }
                        <ToastContainer />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminEvents