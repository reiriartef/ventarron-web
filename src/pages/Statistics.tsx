import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Thermometer,
  Cloud,
  Droplets,
  Wind,
} from "lucide-react";

import {
  fetchRegionalAverages,
  fetchHistoricalTemperatures,
  fetchMonthlyPrecipitation,
  estimateCO2,
} from "@/services/climateApi";

const MARACAIBO_COORDS = { lat: 10.6666, lon: -71.6167 };

const Statistics = () => {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [precipitationData, setPrecipitationData] = useState<any[]>([]);
  const [co2Data, setCO2Data] = useState<any[]>([]);
  const [regionalAverages, setRegionalAverages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      // Temperatura histórica por región
      const [global, venezuela, arctic] = await Promise.all([
        fetchHistoricalTemperatures(0, 0),
        fetchHistoricalTemperatures(10.5, -66.9),
        fetchHistoricalTemperatures(70, 0),
      ]);
      // Formato para gráfico
      const tempYears = global.map((g, i) => ({
        year: g.year,
        global: g.temperature,
        venezuela: venezuela[i]?.temperature ?? null,
        arctic: arctic[i]?.temperature ?? null,
      }));
      setTemperatureData(tempYears);

      // Precipitación mensual Maracaibo
      const precip = await fetchMonthlyPrecipitation(
        MARACAIBO_COORDS.lat,
        MARACAIBO_COORDS.lon
      );
      setPrecipitationData(precip);

      // CO2 estimado por año
      const currentYear = new Date().getFullYear();
      const co2Arr = Array.from({ length: 6 }, (_, i) => {
        const year = (currentYear - 5 + i).toString();
        return { year, co2: estimateCO2() };
      });
      setCO2Data(co2Arr);

      // Promedios regionales actuales
      const averages = await fetchRegionalAverages();
      setRegionalAverages(averages);

      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Cargando estadísticas climáticas...
      </div>
    );
  }

  const temperatureConfig = {
    global: { label: "Global", color: "hsl(194, 100%, 50%)" },
    venezuela: { label: "Venezuela", color: "hsl(43, 96%, 56%)" },
    arctic: { label: "Ártico", color: "hsl(221, 83%, 53%)" },
  };

  const precipitationConfig = {
    amount: { label: "Precipitación (mm)", color: "hsl(194, 100%, 50%)" },
  };

  const co2Config = {
    co2: { label: "CO₂ (ppm)", color: "hsl(0, 84%, 60%)" },
  };

  // Estadísticas clave usando datos reales
  const stats = [
    {
      icon: Thermometer,
      title: "Temperatura Global",
      value: `${
        regionalAverages.find((r) => r.name === "Global")?.temperature ?? "-"
      }°C`,
      description: "Promedio global actual",
      trend: "up",
      color: "text-red-500",
    },
    {
      icon: Cloud,
      title: "CO₂ Atmosférico",
      value: `${co2Data[co2Data.length - 1]?.co2 ?? "-"} ppm`,
      description: "Nivel estimado de dióxido de carbono",
      trend: "up",
      color: "text-orange-500",
    },
    {
      icon: Droplets,
      title: "Precipitación Anual",
      value: `${precipitationData.reduce((sum, m) => sum + m.amount, 0)} mm`,
      description: "Total anual en Maracaibo",
      trend: "down",
      color: "text-blue-500",
    },
    {
      icon: Wind,
      title: "Temperatura Ártico",
      value: `${
        regionalAverages.find((r) => r.name === "Ártico")?.temperature ?? "-"
      }°C`,
      description: "Promedio actual en el Ártico",
      trend: "up",
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Estadísticas Climáticas
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground-secondary leading-relaxed">
            Explora datos climáticos globales con visualizaciones interactivas y
            análisis detallados.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass p-6 hover:glow-primary transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center`}
                >
                  <stat.icon size={24} className="text-background" />
                </div>
                {stat.trend === "up" ? (
                  <TrendingUp className={stat.color} size={20} />
                ) : (
                  <TrendingDown className={stat.color} size={20} />
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground-secondary mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-foreground-secondary">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Tabs defaultValue="temperature" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="temperature">Temperatura</TabsTrigger>
            <TabsTrigger value="precipitation">Precipitación</TabsTrigger>
            <TabsTrigger value="co2">CO₂</TabsTrigger>
          </TabsList>

          {/* Temperature Chart */}
          <TabsContent value="temperature">
            <Card className="glass p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Tendencias de Temperatura Global
                </h2>
                <p className="text-foreground-secondary">
                  Comparación de temperaturas promedio por región (2018-2023)
                </p>
              </div>

              <ChartContainer
                config={temperatureConfig}
                className="h-[400px] w-full"
              >
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="global"
                    stroke="var(--color-global)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="venezuela"
                    stroke="var(--color-venezuela)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="arctic"
                    stroke="var(--color-arctic)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </Card>
          </TabsContent>

          {/* Precipitation Chart */}
          <TabsContent value="precipitation">
            <Card className="glass p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Precipitación Mensual
                </h2>
                <p className="text-foreground-secondary">
                  Promedio de precipitación en Maracaibo (2023)
                </p>
              </div>

              <ChartContainer
                config={precipitationConfig}
                className="h-[400px] w-full"
              >
                <BarChart data={precipitationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-amount)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </Card>
          </TabsContent>

          {/* CO2 Chart */}
          <TabsContent value="co2">
            <Card className="glass p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Niveles de CO₂ Atmosférico
                </h2>
                <p className="text-foreground-secondary">
                  Concentración global de dióxido de carbono (2018-2023)
                </p>
              </div>

              <ChartContainer config={co2Config} className="h-[400px] w-full">
                <AreaChart data={co2Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="co2"
                    stroke="var(--color-co2)"
                    fill="var(--color-co2)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Insights Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="glass p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Puntos Clave
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Calentamiento Global Acelerado
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    La temperatura global ha aumentado 1.5°C desde la era
                    pre-industrial, con efectos significativos en los patrones
                    climáticos regionales.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aumento de CO₂ Atmosférico
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Los niveles de dióxido de carbono han alcanzado 421 ppm, el
                    nivel más alto registrado en la historia humana,
                    contribuyendo al efecto invernadero.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Patrones de Precipitación Cambiantes
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Las regiones tropicales experimentan cambios en los patrones
                    de lluvia, con períodos más intensos de sequía alternando
                    con lluvias torrenciales.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Derretimiento del Ártico
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    Las temperaturas en el Ártico están aumentando dos veces más
                    rápido que el promedio global, afectando los ecosistemas
                    polares y el nivel del mar.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
