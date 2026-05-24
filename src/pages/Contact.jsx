import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <div className='bg-gray-50 text-gray-500'>
      <Navbar />  
      <div id="contact-page" class="page">
        <section class="py-16 bg-gray-50">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">CONTACTO</h2>
              <p class="text-xl text-gray-600">
                ¿Tienes alguna pregunta? Nos encantaría escucharte
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div class="space-y-8">
                <div>
                  <h3 class="text-2xl font-semibold mb-6">
                    INFORMACIÓN DE CONTACTO
                  </h3>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-lg">DIRECCIÓN</h4>
                    <p class="text-gray-600">
                      Calle Urban Style 123<br />28001 Madrid, España
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-lg">TELÉFONO</h4>
                    <p class="text-gray-600">+34 91 123 45 67</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-lg">EMAIL</h4>
                    <p class="text-gray-600">info@urbanthreads.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-lg">HORARIO</h4>
                    <p class="text-gray-600">
                      Lun - Vie: 9:00 - 18:00<br />Sáb: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
              <ContactForm /> 
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Contact