
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  const whatsappMessage = 'https://api.whatsapp.com/send?phone=+595993367902&text=Hola,%20te%20quiero%20publicar%20un%20evento'

  return (
    <footer className="bg-notionbody text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-norwester text-3xl font-bold mb-4">ASU<span className="text-red-500">KEAI</span></h3>
            <p className="text-white/80 mb-6">
              Tu guía esencial para descubrir los eventos y festivales más vibrantes de Asunción. ¡Conecta, vive y celebra la cultura!            
            </p>
            <div className="flex space-x-4 items-end">
              <a href="https://facebook.com/asukeai" target="_blank" rel="noopener noreferrer" 
                className="hover:text-accent transition-colors">
                <SocialIcon url='https://facebook.com/asukeai' target="_blank"/>
              </a>
              <a href="https://instagram.com/asukeai_py" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <SocialIcon url='https://instagram.com/asukeai_py' target="_blank"/>
              </a>
              <a href="https://x.com/asukeai" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <SocialIcon url='https://x.com/asukeai' target="_blank"/>
              </a>
              <a href="https://tiktok.com/@asukeai" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <SocialIcon url='https://tiktok.com/@asukeai' target="_blank" />
              </a>
            </div>
          </div>
          
          <div>
            {/* <h3 className="text-xl font-bold mb-4">Páginas</h3> */}
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors hover:underline">Eventos</Link>
              </li>
              <li>
                <Link to={whatsappMessage} target="_blank" className="text-red-500 hover:text-accent transition-colors hover:underline">Publicar Evento</Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-white/80 hover:text-accent transition-colors hover:underline">Nosotros</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">WhatsApp</h3>
            <p className="text-white/80 mb-4">
              Únete a nuestro grupo de difusión de eventos en WhatsApp.
            </p>
            <SocialIcon url='https://chat.whatsapp.com/Fe1D3aF9BxcANFqFoenUin' target="_blank" />
            <form className="flex">
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} Asukeai. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
