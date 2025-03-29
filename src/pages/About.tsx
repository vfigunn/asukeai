
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const About = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About FestiVibe</h1>
          <p className="text-xl text-gray-600">
            Your gateway to unforgettable experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At FestiVibe, we're passionate about connecting people with amazing experiences. 
              Our mission is to make it easy for everyone to discover and attend the best events 
              in their area, from music festivals to art exhibitions, food tastings to tech conferences.
            </p>
            <p className="text-gray-700">
              We believe that experiences bring people together and create lasting memories. That's 
              why we're committed to showcasing diverse events that appeal to all interests and backgrounds.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop" 
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
            <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
            <p className="text-gray-600">
              We carefully select and showcase the best events to ensure quality experiences for our users.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Up-to-date Information</h3>
            <p className="text-gray-600">
              Our platform automatically updates to show only upcoming events, so you never miss out.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community Focused</h3>
            <p className="text-gray-600">
              We're committed to supporting event organizers and helping them reach their target audience.
            </p>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow us on social media for the latest updates on upcoming events and exclusive content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Facebook size={32} className="text-[#1877F2] mb-4" />
            <h3 className="font-bold">Facebook</h3>
            <p className="text-sm text-gray-500">@festivibe</p>
          </a>
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Instagram size={32} className="text-[#E1306C] mb-4" />
            <h3 className="font-bold">Instagram</h3>
            <p className="text-sm text-gray-500">@festivibe</p>
          </a>
          
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Twitter size={32} className="text-[#1DA1F2] mb-4" />
            <h3 className="font-bold">Twitter</h3>
            <p className="text-sm text-gray-500">@festivibe</p>
          </a>
          
          <a 
            href="mailto:info@festivibe.com"
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Mail size={32} className="text-gray-700 mb-4" />
            <h3 className="font-bold">Email</h3>
            <p className="text-sm text-gray-500">info@festivibe.com</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
