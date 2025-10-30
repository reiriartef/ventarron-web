import { BarChart3, Globe, TrendingUp, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeatureCards = () => {
  const features = [
    {
      icon: Globe,
      title: "Mapamundi Interactivo",
      description: "Explora datos climáticos globales con mapas interactivos de alta resolución y visualizaciones en tiempo real."
    },
    {
      icon: BarChart3,
      title: "Análisis Visual",
      description: "Gráficas dinámicas y comparativas que transforman datos complejos en insights comprensibles."
    },
    {
      icon: TrendingUp,
      title: "Tendencias Climáticas",
      description: "Identifica patrones y tendencias climáticas históricas para comprender el cambio global."
    },
    {
      icon: Database,
      title: "Datos Verificados",
      description: "Información climática de fuentes científicas confiables y actualizadas constantemente."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="glass p-6 hover:glow-primary transition-all duration-300 group cursor-pointer"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} className="text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;