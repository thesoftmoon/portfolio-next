'use client'

import React, { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AdminHeaders from '@/app/components/AdminHeaders';

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/sign-in")
  }, [user])

  return (
    <AdminHeaders />
  )
}

export default Page