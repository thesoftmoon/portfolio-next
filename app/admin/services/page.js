'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function Page() {

    const router = useRouter();

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
                    <button className='primary-btn'>
                        <span className="material-symbols-outlined me-2">
                            post_add
                        </span>
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page