import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

const ClimateIcons = () => {
  const icons = [
    { Icon: Sun, position: "top-1/4 right-1/4", delay: "0s" },
    { Icon: Cloud, position: "top-1/3 left-1/4", delay: "1s" },
    { Icon: CloudRain, position: "bottom-1/3 right-1/3", delay: "2s" },
    { Icon: Wind, position: "bottom-1/4 left-1/3", delay: "3s" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, position, delay }, index) => (
        <div
          key={index}
          className={`absolute ${position} animate-float`}
          style={{ animationDelay: delay }}
        >
          <Icon 
            size={32} 
            className="text-primary/60 drop-shadow-lg" 
          />
        </div>
      ))}
    </div>
  );
};

export default ClimateIcons;