import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-sm z-50">
      <nav className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo o Nombre */}
          <Link href="/" className="text-2xl font-bold text-white">
            [LeyDev]
          </Link>

          {/* Enlaces de Navegación */}
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/#projects" className="text-gray-300 hover:text-white transition-colors">
                Proyectos
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;