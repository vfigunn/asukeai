
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Festi<span className="text-accent">Vibe</span></h3>
            <p className="text-white/80 mb-6">
              Your ultimate destination for discovering the hottest events and festivals in your area.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@festivibe.com"
                className="hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/about#contact" className="text-white/80 hover:text-accent transition-colors">Submit Event</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-white/80 mb-4">
              Subscribe to get updates on upcoming events.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md w-full text-foreground focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-accent px-4 py-2 rounded-r-md font-medium hover:bg-accent/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} FestiVibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
