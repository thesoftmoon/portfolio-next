import React from 'react'
import Link from 'next/link'
import '../styles/AdminSections.scss'

function AdminSections() {
    return (
        <div className='container mx-auto'>
            <div className="flex flex-wrap justify-center h-screen">

                <Link href={`/admin/hero-headers`} className='selector-container'>
                    <div className="icon">
                        <span className='material-symbols-outlined'>photo_library</span>
                    </div>
                    <div className="txt">
                        <h2 className='text-2xl font-bold'>Header Banner</h2>
                        <p className='text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsa?</p>
                    </div>
                    <div className="cta-icon">
                        <span className='material-symbols-outlined'>arrow_forward_ios</span>
                    </div>
                </Link>

                <Link href={`/admin/services`} className='selector-container'>
                    <div className="icon">
                        <span className='material-symbols-outlined'>feed</span>
                    </div>
                    <div className="txt">
                        <h2 className='text-2xl font-bold'>Servicios</h2>
                        <p className='text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsa?</p>
                    </div>
                    <div className="cta-icon">
                        <span className='material-symbols-outlined'>arrow_forward_ios</span>
                    </div>
                </Link>

                <Link href={`/admin/team`} className='selector-container'>
                    <div className="icon">
                        <span className='material-symbols-outlined'>diversity_3</span>
                    </div>
                    <div className="txt">
                        <h2 className='text-2xl font-bold'>Equipo</h2>
                        <p className='text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsa?</p>
                    </div>
                    <div className="cta-icon">
                        <span className='material-symbols-outlined'>arrow_forward_ios</span>
                    </div>
                </Link>
                <Link href={`/admin/events`} className='selector-container'>
                    <div className="icon">
                        <span className='material-symbols-outlined'>theater_comedy</span>
                    </div>
                    <div className="txt">
                        <h2 className='text-2xl font-bold'>Eventos</h2>
                        <p className='text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsa?</p>
                    </div>
                    <div className="cta-icon">
                        <span className='material-symbols-outlined'>arrow_forward_ios</span>
                    </div>
                </Link>
                <Link href={`/admin/contact`} className='selector-container'>
                    <div className="icon">
                        <span className='material-symbols-outlined'>alternate_email</span>
                    </div>
                    <div className="txt">
                        <h2 className='text-2xl font-bold'>Contacto y RRSS</h2>
                        <p className='text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsa?</p>
                    </div>
                    <div className="cta-icon">
                        <span className='material-symbols-outlined'>arrow_forward_ios</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default AdminSections