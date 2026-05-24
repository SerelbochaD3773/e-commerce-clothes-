import React from 'react'
import Connexion from './Connexion'

function Navbar() {
  return (
    
    <nav className="urban-gradient text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
           <div className="flex items-center">
             <h1 className="text-xl font-bold tracking-wider">URBAN THREADS</h1>
           </div>
             <div className="hidden md:block">
              <Connexion />
             </div>
          <div className="md:hidden">
            <button onclick="toggleMobileMenu()" className="text-white hover:text-amber-400 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    
  )
}

export default Navbar