import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-400 py-6">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p>&copy; {currentYear} [Sebastian]. Todos los derechos reservados.</p>
        <p className="mt-2 text-sm">
          Construido con <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Next.js</a> y <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Tailwind CSS</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;