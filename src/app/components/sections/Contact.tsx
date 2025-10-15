'use client'; // ¡Muy importante! Indica que es un componente de cliente.

import React, { useState } from 'react';

const Contact = () => {
  // Estados para manejar los datos del formulario y el estado de envío
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'success', 'error', 'loading'

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene la recarga de la página
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Hablemos</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          ¿Tienes una pregunta, una propuesta o simplemente quieres saludar? Adelante.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          {/* ... (los inputs del formulario no cambian) ... */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Correo Electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 mb-2">Mensaje</label>
            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
          </div>
          
          <div className="text-center">
            <button type="submit" disabled={status === 'loading'} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100">
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>

          {/* Mensajes de estado */}
          {status === 'success' && <p className="text-center text-green-400 mt-4">¡Mensaje enviado con éxito! Gracias por contactarme.</p>}
          {status === 'error' && <p className="text-center text-red-400 mt-4">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;