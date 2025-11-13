import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Thermometer,
  Cloud,
  Droplets,
  Wind,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchAllCitiesClimate, estimateCO2 } from "@/services/climateApi";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = () => {
  const [selectedLayer, setSelectedLayer] = useState<
    "temperature" | "precipitation" | "wind" | "co2"
  >("temperature");
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Importar servicios de clima

  interface ClimateDataType {
    id: number;
    city: string;
    country: string;
    coordinates: [number, number];
    temperature: number;
    precipitation: number;
    wind: number;
    co2: number;
  }

  const [climateData, setClimateData] = useState<ClimateDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClimate() {
      setLoading(true);
      const cities = await fetchAllCitiesClimate();
      // Agregar CO2 estimado a cada ciudad
      const withCO2 = cities.map((city) => ({
        ...city,
        co2: estimateCO2(),
      }));
      setClimateData(withCO2);
      setLoading(false);
    }
    loadClimate();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Cargando datos climáticos...
      </div>
    );
  }

  // ...el array climateData de muestra ha sido eliminado, ahora se usa el estado climateData con datos reales...

  const getMarkerColor = (value: number) => {
    if (selectedLayer === "temperature") {
      if (value < 10) return "#3b82f6";
      if (value < 20) return "#22c55e";
      if (value < 25) return "#eab308";
      return "#ef4444";
    } else if (selectedLayer === "precipitation") {
      if (value < 500) return "#f59e0b";
      if (value < 1000) return "#eab308";
      if (value < 1500) return "#3b82f6";
      return "#1e40af";
    } else if (selectedLayer === "wind") {
      if (value < 10) return "#22c55e";
      if (value < 15) return "#eab308";
      return "#ef4444";
    } else {
      if (value < 410) return "#22c55e";
      if (value < 415) return "#eab308";
      return "#ef4444";
    }
  };

  const getMarkerSize = (value: number) => {
    if (selectedLayer === "temperature") {
      return (value / 30) * 8 + 4;
    } else if (selectedLayer === "precipitation") {
      return (value / 1600) * 8 + 4;
    } else if (selectedLayer === "wind") {
      return (value / 20) * 8 + 4;
    } else {
      return ((value - 400) / 20) * 8 + 4;
    }
  };

  const layerInfo = {
    temperature: {
      icon: Thermometer,
      title: "Temperatura",
      unit: "°C",
      description: "Temperatura promedio anual por región",
      getValue: (data: (typeof climateData)[0]) => data.temperature,
    },
    precipitation: {
      icon: Droplets,
      title: "Precipitación",
      unit: "mm",
      description: "Precipitación anual acumulada",
      getValue: (data: (typeof climateData)[0]) => data.precipitation,
    },
    wind: {
      icon: Wind,
      title: "Viento",
      unit: "km/h",
      description: "Velocidad promedio del viento",
      getValue: (data: (typeof climateData)[0]) => data.wind,
    },
    co2: {
      icon: Cloud,
      title: "CO₂",
      unit: "ppm",
      description: "Concentración de dióxido de carbono",
      getValue: (data: (typeof climateData)[0]) => data.co2,
    },
  };

  const currentLayerInfo = layerInfo[selectedLayer];

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleMoveEnd = (newPosition: {
    coordinates: number[];
    zoom: number;
  }) => {
    setPosition(newPosition);
  };

  // Lógica de paginación
  const totalPages = Math.ceil(climateData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = climateData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Mapamundi Interactivo
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground-secondary leading-relaxed">
            Explora datos climáticos globales en tiempo real. Usa la rueda del
            mouse para hacer zoom y arrastra para mover el mapa.
          </p>
        </div>
      </section>

      {/* Map Controls */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card className="glass p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <currentLayerInfo.icon size={24} className="text-background" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {currentLayerInfo.title}
                </h2>
                <p className="text-sm text-foreground-secondary">
                  {currentLayerInfo.description}
                </p>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={position.zoom >= 4}
                title="Acercar zoom"
              >
                <ZoomIn size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={position.zoom <= 1}
                title="Alejar zoom"
              >
                <ZoomOut size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                title="Restablecer vista"
              >
                <RotateCcw size={18} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant={selectedLayer === "temperature" ? "default" : "outline"}
              className={
                selectedLayer === "temperature" ? "bg-gradient-primary" : ""
              }
              onClick={() => setSelectedLayer("temperature")}
            >
              <Thermometer size={18} className="mr-2" />
              Temperatura
            </Button>
            <Button
              variant={
                selectedLayer === "precipitation" ? "default" : "outline"
              }
              className={
                selectedLayer === "precipitation" ? "bg-gradient-primary" : ""
              }
              onClick={() => setSelectedLayer("precipitation")}
            >
              <Droplets size={18} className="mr-2" />
              Precipitación
            </Button>
            <Button
              variant={selectedLayer === "wind" ? "default" : "outline"}
              className={selectedLayer === "wind" ? "bg-gradient-primary" : ""}
              onClick={() => setSelectedLayer("wind")}
            >
              <Wind size={18} className="mr-2" />
              Viento
            </Button>
            <Button
              variant={selectedLayer === "co2" ? "default" : "outline"}
              className={selectedLayer === "co2" ? "bg-gradient-primary" : ""}
              onClick={() => setSelectedLayer("co2")}
            >
              <Cloud size={18} className="mr-2" />
              CO₂
            </Button>
          </div>
        </Card>
      </section>

      {/* Map Container */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Card className="glass p-4">
          <div style={{ width: "100%", height: "600px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 147,
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates as [number, number]}
                onMoveEnd={handleMoveEnd}
                maxZoom={4}
                minZoom={1}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName =
                        geo.properties.name || "País desconocido";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#1a1f2e"
                          stroke="#2a3f5f"
                          strokeWidth={0.5}
                          onMouseEnter={() => setHoveredCountry(countryName)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              outline: "none",
                              fill: "#2a3f5f",
                              cursor: "pointer",
                            },
                            pressed: { outline: "none" },
                          }}
                          data-tooltip-id="country-tooltip"
                          data-tooltip-content={countryName}
                        />
                      );
                    })
                  }
                </Geographies>

                {climateData.map((location) => {
                  const value = currentLayerInfo.getValue(location);
                  const color = getMarkerColor(value);
                  const baseSize = getMarkerSize(value);
                  // Escalar el tamaño inversamente con el zoom para mantener tamaño visual consistente
                  const size = baseSize / position.zoom;
                  const strokeWidth = 2 / position.zoom;

                  return (
                    <Marker
                      key={location.id}
                      coordinates={location.coordinates}
                      onMouseEnter={() => setHoveredCity(location.id)}
                      onMouseLeave={() => setHoveredCity(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        r={size}
                        fill={color}
                        stroke="#fff"
                        strokeWidth={strokeWidth}
                        fillOpacity={hoveredCity === location.id ? 0.9 : 0.6}
                        style={{
                          transition: "all 0.2s ease",
                        }}
                        data-tooltip-id="city-tooltip"
                        data-tooltip-html={`
                        <div style="padding: 8px; min-width: 200px;">
                          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-weight: bold; font-size: 16px;">
                            <span>${location.city}, ${location.country}</span>
                          </div>
                          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                            <div style="display: flex; justify-content: space-between;">
                              <span>🌡️ Temperatura:</span>
                              <span style="font-weight: 600;">${location.temperature}°C</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                              <span>💧 Precipitación:</span>
                              <span style="font-weight: 600;">${location.precipitation} mm</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                              <span>💨 Viento:</span>
                              <span style="font-weight: 600;">${location.wind} km/h</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                              <span>☁️ CO₂:</span>
                              <span style="font-weight: 600;">${location.co2} ppm</span>
                            </div>
                          </div>
                        </div>
                      `}
                      />
                      {hoveredCity === location.id && (
                        <text
                          textAnchor="middle"
                          y={-size - 5 / position.zoom}
                          style={{
                            fontFamily: "system-ui",
                            fill: "#fff",
                            fontSize: 12 / position.zoom,
                            fontWeight: "bold",
                            pointerEvents: "none",
                          }}
                        >
                          {location.city}
                        </text>
                      )}
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <Tooltip
            id="city-tooltip"
            place="top"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.95)",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px",
              zIndex: 1000,
            }}
          />
          <Tooltip
            id="country-tooltip"
            place="top"
            style={{
              backgroundColor: "rgba(0, 212, 255, 0.9)",
              color: "#020617",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: "600",
              zIndex: 1000,
            }}
          />
        </Card>
      </section>

      {/* Legend */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Card className="glass p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Leyenda</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedLayer === "temperature" && (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#3b82f6" }}
                  />
                  <span className="text-foreground-secondary">
                    &lt; 10°C - Frío
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span className="text-foreground-secondary">
                    10-20°C - Templado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#eab308" }}
                  />
                  <span className="text-foreground-secondary">
                    20-25°C - Cálido
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#ef4444" }}
                  />
                  <span className="text-foreground-secondary">
                    &gt; 25°C - Muy cálido
                  </span>
                </div>
              </>
            )}
            {selectedLayer === "precipitation" && (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#f59e0b" }}
                  />
                  <span className="text-foreground-secondary">
                    &lt; 500mm - Árido
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#eab308" }}
                  />
                  <span className="text-foreground-secondary">
                    500-1000mm - Moderado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#3b82f6" }}
                  />
                  <span className="text-foreground-secondary">
                    1000-1500mm - Húmedo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#1e40af" }}
                  />
                  <span className="text-foreground-secondary">
                    &gt; 1500mm - Muy húmedo
                  </span>
                </div>
              </>
            )}
            {selectedLayer === "wind" && (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span className="text-foreground-secondary">
                    &lt; 10 km/h - Bajo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#eab308" }}
                  />
                  <span className="text-foreground-secondary">
                    10-15 km/h - Moderado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#ef4444" }}
                  />
                  <span className="text-foreground-secondary">
                    &gt; 15 km/h - Alto
                  </span>
                </div>
              </>
            )}
            {selectedLayer === "co2" && (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span className="text-foreground-secondary">
                    &lt; 410 ppm - Normal
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#eab308" }}
                  />
                  <span className="text-foreground-secondary">
                    410-415 ppm - Elevado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: "#ef4444" }}
                  />
                  <span className="text-foreground-secondary">
                    &gt; 415 ppm - Muy elevado
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>
      </section>

      {/* Data Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="glass p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Datos por Ciudad
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-foreground font-semibold">Ciudad</th>
                  <th className="pb-3 text-foreground font-semibold">País</th>
                  <th className="pb-3 text-foreground font-semibold">
                    Temperatura
                  </th>
                  <th className="pb-3 text-foreground font-semibold">
                    Precipitación
                  </th>
                  <th className="pb-3 text-foreground font-semibold">Viento</th>
                  <th className="pb-3 text-foreground font-semibold">CO₂</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((location) => (
                  <tr
                    key={location.id}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-3 text-foreground">{location.city}</td>
                    <td className="py-3 text-foreground-secondary">
                      {location.country}
                    </td>
                    <td className="py-3 text-foreground">
                      {location.temperature}°C
                    </td>
                    <td className="py-3 text-foreground">
                      {location.precipitation} mm
                    </td>
                    <td className="py-3 text-foreground">
                      {location.wind} km/h
                    </td>
                    <td className="py-3 text-foreground">{location.co2} ppm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-foreground-secondary">
                Mostrando {startIndex + 1}-
                {Math.min(endIndex, climateData.length)} de {climateData.length}{" "}
                ciudades
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={
                          currentPage === page ? "bg-gradient-primary" : ""
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default Map;
