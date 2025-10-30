import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contacto@elventarron.com",
      link: "mailto:contacto@elventarron.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+58 412 345 6789",
      link: "tel:+584123456789"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Maracaibo, Venezuela",
      link: null
    }
  ];

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground-secondary leading-relaxed">
            Estamos aquí para responder tus preguntas y escuchar tus comentarios sobre El Ventarrón.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Envíanos un mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="¿Sobre qué quieres escribir?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Información de contacto
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-background" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-foreground-secondary hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-foreground-secondary">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Horario de atención
              </h3>
              <div className="space-y-2 text-foreground-secondary">
                <p>Lunes - Viernes</p>
                <p className="font-semibold text-foreground">9:00 AM - 6:00 PM</p>
                <p className="text-sm mt-4">
                  Responderemos tu mensaje en un plazo de 24-48 horas.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <Card className="glass p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Preguntas frecuentes
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿De dónde provienen los datos climáticos?
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Utilizamos datos de fuentes científicas verificadas como NOAA, NASA y otros
                  organismos internacionales dedicados al monitoreo climático.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Con qué frecuencia se actualizan los datos?
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Los datos se actualizan regularmente siguiendo los ciclos de publicación de
                  nuestras fuentes oficiales, generalmente cada mes o trimestre.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Puedo usar los datos para mi investigación?
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Sí, fomentamos el uso educativo y de investigación. Te recomendamos citar
                  las fuentes originales de los datos en tus trabajos académicos.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Cómo puedo reportar un error o sugerir una mejora?
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Puedes usar el formulario de contacto en esta página o enviarnos un email
                  directamente. Apreciamos todos los comentarios y sugerencias.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
