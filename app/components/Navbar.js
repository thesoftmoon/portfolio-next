import React from 'react'

function Navbar() {
    return (
        <div class="relative shadow bg-white">
            <div class="w-full backdrop-blur-sm">
                <div class="relative z-1 h-16 mx-auto px-5 max-w-7xl flex items-center justify-between text-black">
                    <a class="text-2xl hover:text-cyan-400 transition-colors" href="">Logo</a>
                    <ul class="flex items-center gap-5">
                        <li><a class="hover:text-cyan-400 transition-colors" href="">Inicio</a></li>
                        <li><a class="hover:text-cyan-400 transition-colors" href="">¿Quienes somos?</a></li>
                        <li><a class="hover:text-cyan-400 transition-colors" href="">Eventos</a></li>
                        <li><a class="hover:text-cyan-400 transition-colors" href="">Contáctanos</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar