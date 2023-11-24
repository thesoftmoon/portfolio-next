'use client'
import React, { useState, useEffect } from 'react'
import editData from '@/firebase/firestore/editData';
import getData from '@/firebase/firestore/getData';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import addImage from '@/firebase/firestore/addImage';

function Page({ params }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventData, setEventData] = useState();
  const [file, setFile] = useState(null);
  const [updated, setUpdated] = useState(false);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage)
  }

  // here useEffect for prevent the data loop
  useEffect(() => {
    const fetchData = async () => {
      const { result, error } = await getData('events', `${params.eventId}`)
      if (error) {
        console.log('Hubo un error: ' + error)
      }
      if (result) {
        const data = result.data();
        console.log('data fetch' + data)
        setEventData(data)
        setUpdated(false);
      }
    };

    fetchData();
  }, [params.eventId, updated])

  // here useEffect to console.log the updated state data
  useEffect(() => {
    console.log(eventData);
  }, [eventData])

  const handleUpdate = async (e) => {
    e.preventDefault();
    const notification = toast.loading("Subiendo datos...")
    // Better to store in local variable than state...
    let imageUrl = '';


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


    const newData = {
      name: name,
      image: imageUrl,
      description: description,
    };

    console.log('New Data:', newData)

    const { result, error } = await editData('events', `${params.eventId}`, newData);

    if (error) {
      console.error('Error al actualizar datos:', error);
    }
    else {
      console.log('Datos actualizados correctamente');
      toast.update(notification, { render: "Datos enviados", type: "success", isLoading: false, autoClose: 1000 });
      console.log('Data Updated')
    }
    setName('');
    setDescription('');
    setFile(null);
    setUpdated(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h1 className="text-5xl font-bold m-10">
        Editar evento
      </h1>
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
            placeholder={eventData ? eventData.name : 'cargando...'}
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
            placeholder={eventData ? eventData.description : 'cargando...'}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        {eventData && (
          <div className='mb-4'>
            <p className='block text-gray-700 font-bold mb-2'>Imagen actual</p>
            <Image className='img-main' src={eventData.image} width={500}
              height={500}
              alt={eventData.name} />
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
            Subir evento
          </button>
        </div>
      </form>
      <ToastContainer />

    </main>
  );
}

export default Page