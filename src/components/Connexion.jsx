import React from 'react'
import { Link } from 'react-router-dom'

function Connexion() {
    return (
        
            <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="nav-link px-3 py-2 text-sm font-medium hover:text-amber-400 cursor-pointer">Inicio</Link>
                <Link to="/productos" className="nav-link px-3 py-2 text-sm font-medium hover:text-amber-400 cursor-pointer">Productos</Link>
                <Link to="/contact" className="nav-link px-3 py-2 text-sm font-medium hover:text-amber-400 cursor-pointer">Contacto</Link>
            </div>        

    )
}

export default Connexion