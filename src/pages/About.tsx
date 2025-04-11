
import React from 'react';
import { SocialIcon } from 'react-social-icons'
import ContactForm from '@/components/ContactForm';

const About = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Acerca de Asukeai</h1>
          <p className="text-xl text-gray-600">
              Publicamos eventos en nuestra agenda cultural    
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 mb-4">
            En Asukeai nos apasiona conectar a la gente con experiencias increíbles. 
            Nuestra misión es facilitar que todo el mundo descubra y asista a los mejores eventos 
            en su zona, desde festivales de música a exposiciones de arte, ferias gastronómicas o conferencias.
            </p>
            <p className="text-gray-700">
            Creemos que las experiencias unen a las personas y crean recuerdos duraderos. Por eso, 
            nos comprometemos a presentar eventos variados que atraigan a todo tipo de personas.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://file.notion.so/f/f/14d65858-96a7-4b89-84f5-3f5dcb1d9a22/dcb5accf-92fa-4616-90c6-f3bf89647d9d/Header_Asukeai_Agenda_Cultural_Recomendada.gif?table=collection&id=9283607c-38d8-48da-baa2-b028054bdb62&spaceId=14d65858-96a7-4b89-84f5-3f5dcb1d9a22&expirationTimestamp=1744372800000&signature=lexfEVfL6AkAxVSZPfAYQ1JvEDJMnq0k518hn2UIXDM" 
//https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop              
              alt="Event crowd" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Selección de Eventos</h3>
            <p className="text-gray-600">
                Seleccionamos y presentamos los mejores eventos para garantizar experiencias de calidad a nuestros usuarios.            
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Información actualizada</h3>
            <p className="text-gray-600">
            Nuestra plataforma se actualiza automáticamente para mostrar sólo los próximos eventos, de modo que nunca se los pierda.            
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Enfoque comunitario</h3>
            <p className="text-gray-600">
              Nos comprometemos a apoyar a los organizadores de eventos y ayudarles a llegar a su público objetivo.            
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contacto</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Tiene preguntas o comentarios? ¿Quiere presentar un evento? Póngase en contacto con nuestro equipo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ContactForm />
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Nuestras Redes</h3>
              <p className="text-gray-600 mb-8">
              Síganos en las redes sociales para estar al día de los próximos eventos y contenidos exclusivos.
              </p>
              
              <div className="space-y-6">
                <a 
                  href="https://www.facebook.com/asukeai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SocialIcon url='https://www.facebook.com/asukeai/' className="text-[#1877F2] mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold">Facebook</h4>
                    <p className="text-sm text-gray-500">@asukeai</p>
                  </div>
                </a>
                
                <a 
                  href="https://instagram.com/asukeai_py" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SocialIcon url='https://instagram.com/asukeai_py' className="text-[#E1306C] mr-4" target="_blank"  />
                  <div>
                    <h4 className="font-bold">Instagram</h4>
                    <p className="text-sm text-gray-500">@asukeai_py</p>
                  </div>
                </a>
                
                <a 
                  href="https://x.com/asukeai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SocialIcon url='https://x.com/asukeai' className="text-[#0A0A0A] mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold">X</h4>
                    <p className="text-sm text-gray-500">@asukeai</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@asukeai"
                  target="_blank"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SocialIcon url='https://www.tiktok.com/@asukeai' className="text-gray-700 mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold">TikTok</h4>
                    <p className="text-sm text-gray-500">@asukeai</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
