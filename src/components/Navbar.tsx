
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, refreshProfile } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Refresh profile on navigation to ensure admin status is current
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [location.pathname, isAuthenticated, refreshProfile]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl text-primary">Festi<span className="text-accent">Vibe</span></span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-base font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
            Events
          </Link>
          <Link to="/about" className={`text-base font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
            About Us
          </Link>
          
          {/* Admin link - different display based on auth state */}
          {isAuthenticated && isAdmin ? (
            <Link 
              to="/admin/dashboard" 
              className={`text-base font-medium transition-colors flex items-center ${
                isActive('/admin/dashboard') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              <Shield size={16} className="mr-1" />
              Admin Dashboard
            </Link>
          ) : (
            <Link 
              to="/admin" 
              className={`text-base font-medium transition-colors flex items-center ${
                isActive('/admin') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              <User size={16} className="mr-1" />
              Admin
            </Link>
          )}
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
              Events
            </Link>
            <Link 
              to="/about" 
              className={`text-base font-medium py-2 ${isActive('/about') ? 'text-primary' : 'text-foreground/80'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {isAuthenticated && isAdmin ? (
              <Link 
                to="/admin/dashboard" 
                className={`text-base font-medium py-2 flex items-center ${
                  isActive('/admin/dashboard') ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield size={16} className="mr-1" />
                Admin Dashboard
              </Link>
            ) : (
              <Link 
                to="/admin" 
                className={`text-base font-medium py-2 flex items-center ${
                  isActive('/admin') ? 'text-primary' : 'text-foreground/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} className="mr-1" />
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
