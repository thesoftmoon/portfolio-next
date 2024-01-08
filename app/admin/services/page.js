'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext';
import AdminServices from '@/app/components/AdminServices';



function Page() {

    const { user } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
        if (user == null) router.push("/sign-in")
    }, [user])

    return (
        <AdminServices/>
    )
}

export default Page