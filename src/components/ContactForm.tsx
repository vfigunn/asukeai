import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Mensaje enviado con éxito!', {
          description: 'Nos pondremos en contacto con usted lo antes posible.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (error) {
      toast.error('Error de conexión. Inténtalo de nuevo.');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10  bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="email@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="Escriba aquí..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-primary rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <div className="mr-2 h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <Send size={16} className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
