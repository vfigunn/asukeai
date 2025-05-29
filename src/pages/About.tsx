
import React from 'react';
import { SocialIcon } from 'react-social-icons'
import ContactForm from '@/components/ContactForm';

const About = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-16 md:py-24 text-white ">
          <div>
            <h2 className="font-norwester text-2xl md:text-3xl font-bold mb-4 text-center">Nuestra Mision</h2>
            <p className="text-gray-400 text-center">
            En Asukeai, nos apasiona conectar a las personas con experiencias culturales únicas que inspiran, despiertan preguntas y fomentan el espíritu crítico y la ciudadanía. Nuestra misión es ser el puente que une a artistas, productores y públicos, facilitando el acceso a la rica oferta cultural de la ciudad: desde festivales de música, exposiciones de arte, teatro, danza y poesía, hasta ferias, capacitaciones, fotografía, cine y charlas inspiradoras. Creemos que estas experiencias no solo crean recuerdos imborrables, sino que también tejen lazos y construyen el alma de nuestra ciudad. ¡Explore, conéctese y viva Asunción!
            </p>
          </div>
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
