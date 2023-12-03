'use client'

import React, { useEffect } from 'react'
import AdminEvents from '@/app/components/AdminEvents'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/sign-in")
  }, [user])

  return (
    <AdminEvents />
  )
}

export default Page