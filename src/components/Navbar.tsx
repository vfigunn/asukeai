
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const whatsappMessage = 'https://api.whatsapp.com/send?phone=+595993367902&text=Hola,%20te%20quiero%20publicar%20un%20evento'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="shadow-sm sticky top-0 z-50 bg-notionbody">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="ml-8 font-norwester font-bold text-2xl text-white"><a href="/"><img src="/assets/logos/header_asukeai.gif" alt="header_asukeai" className='h-20 rounded-lg' /></a></span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-norwester font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-white hover:text-primary'}`}>
            Eventos
          </Link>
          <Link to={whatsappMessage} target="_blank" className={`font-norwester font-medium transition-colors ${isActive('') ? 'text-white' : 'text-red-500 hover:text-white'}`}>
            Publicar Evento
          </Link>
          <Link to="/nosotros" className={`font-norwester font-medium transition-colors ${isActive('/nosotros') ? 'text-primary' : 'text-white hover:text-primary'}`}>
            Nosotros
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`text-base font-medium py-2 ${isActive('/') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              to="/nosotros" 
              className={`text-base font-medium py-2 ${isActive('/nosotros') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
