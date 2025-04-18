
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl text-primary">Asu<span className="text-accent">keai</span></span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-base font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
            Eventos
          </Link>
          <Link to="/nosotros" className={`text-base font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
            Nosotros
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
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
              className={`text-base font-medium py-2 ${isActive('/about') ? 'text-primary' : 'text-foreground/80'}`}
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
