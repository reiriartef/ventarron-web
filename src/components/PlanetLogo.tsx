interface PlanetLogoProps {
  className?: string;
}

const PlanetLogo = ({ className }: PlanetLogoProps) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img
        src="/mundo.png"
        alt="Planet Logo"
        className="w-full h-full drop-shadow-2xl"
      />
    </div>
  );
};

export default PlanetLogo;