import { Button } from "@/components/ui/button";
import ClimateIcons from "./ClimateIcons";
import PlanetLogo from "./PlanetLogo";

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Climate Icons Animation */}
      <ClimateIcons />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Planet Logo SVG */}
          <div className="flex justify-center mb-12">
            <PlanetLogo className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64" />
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                El Ventarrón
              </span>
              <br />
              <span className="text-foreground-secondary text-2xl sm:text-3xl lg:text-4xl font-normal">
                Información climática para entender nuestro planeta
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              Visualiza, compara y explora datos climáticos con mapas y gráficas interactivas.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg"
              className="btn-hero px-8 py-4 text-lg font-semibold animate-pulse-glow"
              onClick={() => document.getElementById('mapamundi')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explora el clima ahora
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;