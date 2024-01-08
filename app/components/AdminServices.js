import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import getCollectionData from '@/firebase/firestore/getCollectionData';
import addData from '@/firebase/firestore/addData';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Modal from './Modal';
import addImage from '@/firebase/firestore/addImage';
import deleteData from '@/firebase/firestore/deleteData';
import editData from '@/firebase/firestore/editData';

function AdminServices() {

    const router = useRouter();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [modalStatus, setModalStatus] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [modalData, setModalData] = useState(null)

    const openEditModal = (data) => {
        setModalData(data)
    }

    const closeEditModal = () => {
        setModalData(null);
        setTitle('');
        setDescription('');
        setFile(null);
    }

    const openAddModal = () => {
        setModalStatus(true)
    }

    const closeAddModal = () => {
        setModalStatus(false);
        setTitle('');
        setDescription('');
        setFile(null);
    }

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { result, error } = await getCollectionData('services');
            if (error) {
                setError(error)
            }
            else {
                setData(result)
                setUpdated(false);
            }
        };
        fetchData();
    }, [updated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = toast.loading("Subiendo datos...")
        // Better to store in local variable than state...
        let imageUrl = '';

        if (file) {
            try {
                const { result, error } = await addImage('services', file)
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
            title: title,
            image: imageUrl,
            description: description,
        }

        const { result, error } = await addData('services', data)

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

    const handleDelete = async (id) => {

        const confirmResult = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!'
        });
        if (confirmResult.isConfirmed) {
            const { result, error } = await deleteData('services', id);
            if (error) {
                console.log(error + ' ID: ' + id);
            }
            else {
                console.log(result);
                setUpdated(true);
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'Tu registro ha sido eliminado.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
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
            ...(title && { title }),
            ...(imageUrl && { image: imageUrl }),
            ...(description && { description }),
        };
        console.log('New Data:', newData)
        const { result, error } = await editData('services', `${modalData.id}`, newData);
        if (error) {
            console.error('Error al actualizar datos:', error);
        }
        else {
            console.log('Datos actualizados correctamente');
            closeEditModal();
            toast.update(notification, { render: "Datos enviados", type: "success", isLoading: false, autoClose: 1000 });
            console.log('Data Updated')
        }
        setTitle('');
        setDescription('');
        setFile(null);
        setUpdated(true);

    };

    return (
        <div className='min-h-screen bg-zinc-700 pt-10 pb-5'>
            <div className='title-container'>
                <div className='flex items-baseline'>
                    <div className='me-5'>
                        <button className='icon-primary-btn' onClick={() => router.back()}>
                            <span className="material-symbols-outlined">
                                undo
                            </span>
                        </button>
                    </div>
                    <h1 className='title text-white'>Servicios</h1>
                </div>
                <div>
                    <button className='primary-btn' onClick={() => openAddModal()}>
                        <span className="material-symbols-outlined me-2">
                            post_add
                        </span>
                        Añadir
                    </button>
                </div>
            </div>
            {/* Start Add Modal */}
            {modalStatus &&
                <Modal onClose={closeAddModal}>
                    <main className="flex flex-col items-center">

                        <div className='text-center mb-2'>
                            <h1 className="text-2xl font-bold text-black">
                                Añadir servicio
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
                                    value={title}
                                    placeholder='Añade un título'
                                    onChange={(e) => setTitle(e.target.value)} />
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
                                    Añadir servicio
                                </button>
                            </div>

                        </form>


                    </main>
                </Modal>
            }
            {/* End Add Modal */}
            <div className='bg-zinc-700 flex flex-wrap'>
                {data.map((item) => (
                    <div className='w-full sm:w-1/2 md:w-1/3 p-4' key={item.id}>
                        <div className="relative mt-6 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className='btn-container'>
                                <button className='edit-btn' onClick={() => openEditModal(item)}>
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </button>
                                <button className='delete-btn' onClick={() => handleDelete(item.id)}>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                            <div className="p-6">
                                <Image className='icon-img m-5' src={item.image} width={100}
                                    height={100}
                                    alt={item.title} />
                                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    {item.title}
                                </h5>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        {/* Start Edit Modal */}
                        {modalData &&
                            <Modal onClose={closeEditModal}>
                                <main className="flex flex-col items-center">
                                    <div className='text-center mb-2'>
                                        <h1 className="text-2xl font-bold text-black">
                                            Editar servicio
                                        </h1>
                                    </div>
                                    <form onSubmit={handleUpdate} className='w-full md:w-full'>
                                        <div className="mb-2">
                                            <label htmlFor="name" className='block text-sm text-gray-700 font-bold mb-1'>
                                                Título
                                            </label>
                                            <input type="text"
                                                id='name'
                                                className='text-black w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                                                value={title}
                                                placeholder={modalData ? modalData.title : 'cargando...'}
                                                onChange={(e) => setTitle(e.target.value)} />
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
                                                Actualizar servicio
                                            </button>
                                        </div>

                                    </form>
                                </main>
                            </Modal>
                        }
                        {/* End Edit Modal */}
                    </div>




                ))}
                <ToastContainer />
            </div>
        </div>
    )
}

export default AdminServices