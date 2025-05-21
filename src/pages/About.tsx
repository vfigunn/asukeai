
import React from 'react';
import { SocialIcon } from 'react-social-icons'
import ContactForm from '@/components/ContactForm';

const About = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-16 md:py-24 text-white ">
        {/* <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-norwester text-3xl md:text-5xl font-bold mb-6">Acerca de <span className='text-red-500'>ASUKEAI</span></h1>
          <p className="text-xl text-gray-400">
              Publicamos eventos en nuestra agenda cultural    
          </p>
        </div> */}
        
          <div>
            <h2 className="font-norwester text-2xl md:text-3xl font-bold mb-4 text-center">Nuestra Mision</h2>
            {/* <p className="text-gray-400 mb-4 text-center">
            En Asukeai nos apasiona conectar a la gente con experiencias increíbles. 
            Nuestra misión es facilitar que todo el mundo descubra y asista a los mejores eventos 
            en su zona, desde festivales de música a exposiciones de arte, ferias gastronómicas o conferencias.
            </p>
            <p className="text-gray-400 text-center">
            Creemos que las experiencias unen a las personas y crean recuerdos duraderos. Por eso, 
            nos comprometemos a presentar eventos variados que atraigan a todo tipo de personas.
            </p> */}
            <p className="text-gray-400 text-center">
            En Asukeai nos apasiona conectar a la gente con experiencias increíbles. Nuestra misión es facilitar que todo el mundo descubra y asista a los mejores eventos en su zona, desde festivales de música a exposiciones de arte, ferias gastronómicas o conferencias. Creemos que las experiencias unen a las personas y crean recuerdos duraderos. Por eso, nos comprometemos a presentar eventos variados que atraigan a todo tipo de personas. Reemplazar por: "En Asukeai, nos apasiona conectar a las personas con experiencias culturales únicas que inspiran, despiertan preguntas y fomentan el espíritu crítico y la ciudadanía. Nuestra misión es ser el puente que une a artistas, productores y públicos, facilitando el acceso a la rica oferta cultural de la ciudad: desde festivales de música, exposiciones de arte, teatro, danza y poesía, hasta ferias, capacitaciones, fotografía, cine y charlas inspiradoras. Creemos que estas experiencias no solo crean recuerdos imborrables, sino que también tejen lazos y construyen el alma de nuestra ciudad. ¡Explore, conéctese y viva Asunción!"
            </p>
          </div>
          {/* <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://asukeai.vercel.app/portada.gif" 
//https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop              
              alt="Event crowd" 
              className="w-full h-full object-cover"
            />
          </div> */}
{/*         
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="p-6 rounded-lg shadow-md bg-notioncard">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="font-norwester text-xl font-bold mb-2">Seleccion de Eventos</h3>
            <p className="text-gray-400">
                Seleccionamos y presentamos los mejores eventos para garantizar experiencias de calidad a nuestros usuarios.            
            </p>
          </div>
          
          <div className= "p-6 rounded-lg shadow-md bg-notioncard">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-norwester text-xl font-bold mb-2">Informacion actualizada</h3>
            <p className="text-gray-400">
            Nuestra plataforma se actualiza automáticamente para mostrar sólo los próximos eventos, de modo que nunca se los pierda.            
            </p>
          </div>
          
          <div className="p-6 rounded-lg shadow-md bg-notioncard">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-norwester text-xl font-bold mb-2">Enfoque comunitario</h3>
            <p className="text-gray-400">
              Nos comprometemos a apoyar a los organizadores de eventos y ayudarles a llegar a su público objetivo.            
            </p>
          </div>
        </div> */}
      </section>
      <section className="rounded-lg container mx-auto px-4 py-16 bg-gray-50 text-white bg-notioncard">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-norwester text-2xl md:text-3xl font-bold mb-4">Contacto</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              ¿Tiene preguntas o comentarios?
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Póngase en contacto con nuestro equipo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ContactForm />
            
            <div className="p-8 rounded-lg shadow-md bg-notionbody">
              <h3 className="font-norwester text-2xl font-bold mb-6npm">Nuestras Redes</h3>
              <p className="text-gray-400 mb-8">
              Síganos en las redes sociales para estar al día de los próximos eventos y contenidos exclusivos.
              </p>
              
              <div className="space-y-6">
                <a 
                  href="https://www.facebook.com/asukeai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-400 transition-colors bg-notioncard"
                >
                  <SocialIcon url='https://www.facebook.com/asukeai/' className="text-[#1877F2] mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold group-hover:text-black">Facebook</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-800">@asukeai</p>
                  </div>
                </a>
                
                <a 
                  href="https://instagram.com/asukeai_py" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-400 transition-colors bg-notioncard"
                >
                  <SocialIcon url='https://instagram.com/asukeai_py' className="text-[#E1306C] mr-4" target="_blank"  />
                  <div>
                    <h4 className="font-bold group-hover:text-black">Instagram</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-800">@asukeai_py</p>
                  </div>
                </a>
                
                <a 
                  href="https://x.com/asukeai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-400 transition-colors bg-notioncard"
                >
                  <SocialIcon url='https://x.com/asukeai' className="text-[#0A0A0A] mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold group-hover:text-black">X</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-800">@asukeai</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@asukeai"
                  target="_blank"
                  className="flex items-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-400 transition-colors bg-notioncard"
                >
                  <SocialIcon url='https://www.tiktok.com/@asukeai' className="text-gray-700 mr-4" target="_blank" />
                  <div>
                    <h4 className="font-bold group-hover:text-black">TikTok</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-800">@asukeai</p>
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
