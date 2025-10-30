import { Card } from "@/components/ui/card";
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  Telescope,
  BookOpen,
} from "lucide-react";
import PlanetLogo from "@/components/PlanetLogo";

const About = () => {
  const mission = [
    {
      icon: Target,
      title: "Nuestra Misión",
      description:
        "Democratizar el acceso a información climática de calidad, transformando datos complejos en conocimiento accesible para todos.",
    },
    {
      icon: Users,
      title: "Para Quién",
      description:
        "Estudiantes, investigadores, educadores y cualquier persona interesada en comprender los patrones climáticos de nuestro planeta.",
    },
    {
      icon: Lightbulb,
      title: "Nuestra Visión",
      description:
        "Ser la plataforma de referencia para la exploración climática, fomentando la educación y la toma de decisiones informadas.",
    },
  ];

  const values = [
    {
      icon: Telescope,
      title: "Rigor Científico",
      description:
        "Nos basamos en datos verificados de fuentes científicas confiables y reconocidas internacionalmente.",
    },
    {
      icon: BookOpen,
      title: "Accesibilidad",
      description:
        "Diseñamos interfaces intuitivas que hacen la ciencia climática comprensible para todos los niveles de conocimiento.",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description:
        "Estamos comprometidos con la educación ambiental y la concientización sobre el cambio climático global.",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <PlanetLogo className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Acerca de El Ventarrón
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto">
            Una plataforma innovadora que conecta la ciencia climática con la
            tecnología para hacer el conocimiento ambiental accesible y
            comprensible para todos.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mission.map((item, index) => (
            <Card
              key={index}
              className="glass p-8 hover:glow-primary transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={32} className="text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="glass p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-lg text-foreground-secondary leading-relaxed">
              <p>
                El Ventarrón nace de la necesidad de hacer la información
                climática más accesible y comprensible. En un mundo donde el
                cambio climático es uno de los desafíos más importantes de
                nuestra era, creemos que el conocimiento debe estar al alcance
                de todos.
              </p>
              <p>
                Combinamos tecnología de visualización de datos de vanguardia
                con fuentes científicas verificadas para crear una experiencia
                única de exploración climática. Cada mapa, cada gráfica y cada
                dato está diseñado para contar una historia sobre nuestro
                planeta.
              </p>
              <p>
                Nuestro nombre, "El Ventarrón", evoca los vientos del cambio y
                la fuerza de la naturaleza, recordándonos que estamos
                interconectados con los sistemas climáticos que definen nuestro
                mundo.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="glass p-8 hover:glow-primary transition-all duration-300 group text-center"
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={32} className="text-background" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="glass p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Tecnología y Fuentes de Datos
            </h2>
            <div className="space-y-4 text-lg text-foreground-secondary leading-relaxed">
              <p>
                Utilizamos tecnologías web modernas para crear visualizaciones
                interactivas y responsivas que funcionan en cualquier
                dispositivo. Nuestra plataforma está construida con React y
                bibliotecas especializadas en visualización de datos.
              </p>
              <p>
                Los datos climáticos provienen de fuentes científicas
                reconocidas como NOAA (National Oceanic and Atmospheric
                Administration), NASA, y otros organismos internacionales
                dedicados al monitoreo climático y atmosférico.
              </p>
              <p>
                Nos comprometemos a mantener la transparencia en nuestras
                fuentes y metodologías, asegurando que la información presentada
                sea precisa, actualizada y verificable.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center py-6">
          <div className="bg-background/60 rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Créditos del proyecto
            </h3>
            <div className="flex flex-row items-center justify-center gap-4 text-left">
              <div>
                <p className="text-foreground-secondary">Ricardo Iriarte</p>
                <p className="text-foreground-secondary">Eduardo Chirinos</p>
                <p className="text-foreground-secondary">Armando Paris</p>
                <p className="text-foreground-secondary">Pablo Quintero</p>
                <p className="text-foreground-secondary">Manuel Ocando</p>
              </div>
              <div>
                <p className="text-foreground-secondary">27.304.900</p>
                <p className="text-foreground-secondary">31.041.048</p>
                <p className="text-foreground-secondary">30.274.825</p>
                <p className="text-foreground-secondary">27.367.243</p>
                <p className="text-foreground-secondary">26.743.919</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
