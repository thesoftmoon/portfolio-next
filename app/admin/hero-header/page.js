'use client'
import React, { useState } from 'react'
import NewHeroHeader from '@/app/components/NewHeroHeader'
import Modal from '@/app/components/Modal'

function Page() {

    const [isModalOpen, setModalIsOpen] = useState(false);

    const openModal = ()=>{
        setModalIsOpen(true)
    }

    const closeModal = ()=>{
        setModalIsOpen(false);
    }
    return (
        <div>
            <button onClick={openModal}>Abrir Modal</button>

            {isModalOpen &&
            <Modal onClose={closeModal}>
                test
            </Modal>
            }

            <NewHeroHeader />
        </div>
    )
}

export default Page