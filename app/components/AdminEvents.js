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
import addData from '@/firebase/firestore/addData';

function AdminEvents() {
    const [eventsData, setEventsData] = useState([]);
    const [error, setError] = useState(null);

    const [modalData, setModalData] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [modalStatus, setModalStatus] = useState(false)

    const openEditModal = (data) => {
        setModalData(data)
    }

    const openAddModal = () => {
        setModalStatus(true)
    }

    const closeEditModal = () => {
        setModalData(null);
        setName('');
        setDescription('');
        setFile(null);
    }

    const closeAddModal = () => {
        setModalStatus(false);
        setName('');
        setDescription('');
        setFile(null);
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
            closeAddModal()
            setUpdated(true)
        }
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
            closeEditModal();
            toast.update(notification, { render: "Datos enviados", type: "success", isLoading: false, autoClose: 1000 });
            console.log('Data Updated')
        }
        setName('');
        setDescription('');
        setFile(null);
        setUpdated(true);

    };
    return (
        <div className='h-screen bg-zinc-700 pt-16'>
            <div className='title-container'>
                <h1 className='title text-white'>Eventos</h1>
                <div>
                    <button className='primary-btn' onClick={() => openAddModal()}>
                        <span className="material-symbols-outlined me-2">
                            add_photo_alternate
                        </span>
                        Añadir
                    </button>
                </div>
            </div>


            {/* Add Modal */}
            {modalStatus &&
                <Modal onClose={closeAddModal}>
                    <main className="flex flex-col items-center">
                        <div className='text-center mb-2'>
                            <h1 className="text-2xl font-bold text-black">
                                Añadir evento
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit} className='w-full md:w-full'>
                            <div className="mb-2">
                                <label htmlFor="name" className='block text-sm text-gray-700 font-bold mb-1'>
                                    Nombre
                                </label>
                                <input type="text"
                                    id='name'
                                    className='text-black w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                    value={name}
                                    placeholder='Añade un nombre'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="message" className='text-sm block text-gray-700 font-bold mb-1'>
                                    Descripción
                                </label>
                                <textarea type="text"
                                    id='message'
                                    rows={2}
                                    className='text-sm text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                    value={description}
                                    placeholder='Añade una descripción'
                                    onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className='block text-gray-700 font-bold mb-2 text-sm'>
                                    Imagen
                                </label>
                                <input type="file"
                                    id='image'
                                    className='relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex justify-center">
                                <button type='submit' className="primary-btn">
                                    Añadir evento
                                </button>
                            </div>
                        </form>


                    </main>
                </Modal>
            }
            {/* Add Modal */}

            <div className=' flex flex-wrap'>
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
                            <button className='edit-btn' onClick={() => openEditModal(event)}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </div>

                        {/* Edit Modal */}
                        {modalData &&
                            <Modal onClose={closeEditModal}>
                                <main className="flex flex-col items-center">
                                    <div className='text-center mb-2'>
                                        <h1 className="text-2xl font-bold text-black">
                                            Editar evento
                                        </h1>
                                        {/* <h2 className='text-black'>con id: {modalData.id}</h2> */}
                                    </div>
                                    {/* <h1>aca va la form del evento : {params.eventId}</h1> */}
                                    <form onSubmit={handleUpdate} className='w-full md:w-full'>
                                        <div className="mb-2">
                                            <label htmlFor="name" className='block text-sm text-gray-700 font-bold mb-1'>
                                                Nombre
                                            </label>
                                            <input type="text"
                                                id='name'
                                                className='text-black w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                                value={name}
                                                placeholder={modalData ? modalData.name : 'cargando...'}
                                                onChange={(e) => setName(e.target.value)} />
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="message" className='text-sm block text-gray-700 font-bold mb-1'>
                                                Descripción
                                            </label>
                                            <textarea type="text"
                                                id='message'
                                                rows={2}
                                                className='text-sm text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                                value={description}
                                                placeholder={modalData ? modalData.description : 'cargando...'}
                                                onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                        {modalData && (
                                            <div className='mb-2'>
                                                <p className='block text-gray-700 font-bold mb-2 text-sm'>Imagen actual</p>
                                                <Image className='form-actual-img' src={modalData.image} width={500}
                                                    height={500}
                                                    alt={modalData.name} />
                                            </div>
                                        )
                                        }

                                        <div className="mb-4">
                                            <label htmlFor="image" className='block text-gray-700 font-bold mb-2 text-sm'>
                                                Imagen
                                            </label>
                                            <input type="file"
                                                id='image'
                                                className='relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <div className="flex justify-center">
                                            <button type='submit' className="primary-btn">
                                                Actualizar evento
                                            </button>
                                        </div>
                                    </form>


                                </main>
                            </Modal>
                        }
                        {/* Edit Modal */}

                        <ToastContainer />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminEvents