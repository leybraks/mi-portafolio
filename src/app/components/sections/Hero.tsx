import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Hola, soy <span className="text-cyan-400">[Sebastian]</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Soy un estudiante de Ciencia de Datos e Inteligencia Artificial apasionado por crear soluciones tecnológicas innovadoras y eficientes.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/#projects" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Ver mis Proyectos
          </Link>
          <a 
            href="/ruta/a/tu-cv.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;