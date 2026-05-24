import { useState, useEffect } from "react"
import axios from "axios"
import { end_points } from "../services/api"
import { questionAlert } from "../helpers/alerts"
import { errorAlert } from "../helpers/alerts"
import { saveLocalStorage } from "../helpers/local-storage"


function ContactForm() {
 const [firstName, setFirstName] = useState("")
 const [lastName, setLastName] = useState("")
 const [email, setEmail] = useState("")
 const [subject, setSubject] = useState("")
 const [message, setMessage] = useState("")

function getMessage(){
 fetch(end_points.messages)
    .then(response => response.json())
    .then(data => setMessage(data))
    .catch(error => console.log(error))     
}
  useEffect(() => {
    getMessage()
  }, [])
 
 function sendMessage(e) {
    e.preventDefault()
     if (firstName === "" || lastName === "" || email === "" || subject === "" || message === "") {
      errorAlert("Error", "Todos los campos son obligatorios")    
     } else {
      const formData = { firstName, lastName, email, subject, message };
      saveLocalStorage("contactForm", formData);
      console.log("Datos capturados:", formData);
      questionAlert();
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
  }  
 } 

  return (
    <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">ENVÍANOS UN MENSAJE</h3>
              <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6">
                <p className="text-amber-700 text-sm">
                  <strong>Demo:</strong> Este es un formulario de demostración.
                  Los mensajes no se enviarán realmente.
                </p>
              </div>
              <form id="contact-form" onSubmit={sendMessage}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="firstName" className="block text-sm font-medium text-gray-700 mb-2">NOMBRE</label>
                    <input type="text" id="firstName" name="firstName" required="" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label for="lastName" className="block text-sm font-medium text-gray-700 mb-2">APELLIDOS</label>
                    <input type="text" id="lastName" name="lastName" required="" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="mb-6">
                  <label for="email" className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
                  <input type="email" id="email" name="email" required="" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-6">
                  <label for="subject" className="block text-sm font-medium text-gray-700 mb-2">ASUNTO</label>
                  <select id="subject" name="subject" required="" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="">Selecciona un asunto</option>
                    <option value="general">Consulta general</option>
                    <option value="product">Información de producto</option>
                    <option value="order">Estado de pedido</option>
                    <option value="return">Devoluciones</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label for="message" className="block text-sm font-medium text-gray-700 mb-2">MENSAJE</label>
                  <textarea id="message" name="message" rows="5" required="" className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white py-4 px-6 hover:bg-gray-800 transition-colors font-semibold tracking-wider">
                  ENVIAR MENSAJE
                </button>
              </form>
            </div>
  )
}

export default ContactForm