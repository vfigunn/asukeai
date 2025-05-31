import { AsukeaiChat } from '@/components/AsukeaiChat';

export default function Chat() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex-shrink-0 text-center py-4 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Habla con Asukeai
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto hidden md:block">
          Pregúntame sobre eventos, restaurantes, ofertas y más en Asunción. 
          Estoy aquí para ayudarte a descubrir lo mejor de la ciudad.
        </p>
      </div>
      <div className="flex-1 overflow-hidden px-4 pb-4">
        <AsukeaiChat />
      </div>
    </div>
  );
}