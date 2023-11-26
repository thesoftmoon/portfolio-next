'use client'
import React, {useState} from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import '../styles/Login.scss'

function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }
        console.log(result)
        return router.push("/admin")
    }
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-center content-center login-container">
                <div className="w-full md:w-2/4 login-card">
                    <h1 className="mb-10 text-4xl font-semibold text-gray-900 text-center">Inicia sesión</h1>
                    <form onSubmit={handleForm} className="form">
                        <label htmlFor="email">
                            <p className="text-base font-semibold leading-7 text-gray-900">Correo</p>
                            <input className="mb-5 p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                        </label>
                        <label htmlFor="password">
                            <p className="text-base font-semibold leading-7 text-gray-900">Contraseña</p>
                            <input className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                        </label>
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Page;