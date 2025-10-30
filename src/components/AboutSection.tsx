const AboutSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Conectando ciencia y tecnología
          </h2>
          <p className="text-lg sm:text-xl text-foreground-secondary leading-relaxed">
            El Ventarrón es una plataforma de datos climáticos que combina visualizaciones 
            interactivas con análisis accesible para investigadores, estudiantes y público 
            general. Nuestro objetivo es hacer que la información climática compleja sea 
            comprensible y útil para todos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;