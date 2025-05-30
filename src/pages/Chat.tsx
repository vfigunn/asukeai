import { AsukeaiChat } from '@/components/AsukeaiChat';

export default function Chat() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-8">
          Habla con Asukeai
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Pregúntame sobre eventos, restaurantes, ofertas y más en Asunción. 
          Estoy aquí para ayudarte a descubrir lo mejor de la ciudad.
        </p>
        <AsukeaiChat />
      </div>
    </div>
  );
}