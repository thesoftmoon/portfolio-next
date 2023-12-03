'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import AdminSections from '../components/AdminSections';


function Page() {

  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/sign-in")
  }, [user])


  return (

    <div className='container mx-auto'>
      <div className="flex flex-wrap justify-center">
        <div className='title-admin text-center'>
          <h1 className='text-4xl font-bold'>Seccion Admin</h1>
          <p className='text-base font-light'>Aca puedes editar todas las secciones disponibles</p>
        </div>
        <AdminSections />
      </div>
    </div>
  )
}

export default Page