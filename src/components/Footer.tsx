import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-background-secondary border-t border-glass-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo Ventarron" className="max-w-16" />

            <div className="text-foreground-secondary">
              <p className="font-medium">El Ventarrón</p>
              <p className="text-sm">© 2025 - Información Climática</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-foreground-secondary hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
