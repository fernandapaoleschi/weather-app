import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getWeatherIcon,
  WindIcon,
  DropletIcon,
  ThermometerIcon,
  MapPinIcon,
} from '@/components/weather-icons'
import type { WeatherResponse } from '@/lib/weather-types'

interface WeatherCardProps {
  data: WeatherResponse
}

/**
 * Card principal de exibicao do clima.
 * Mostra temperatura, descricao, vento, umidade e sensacao termica.
 */
export function WeatherCard({ data }: WeatherCardProps) {
  const WeatherIcon = getWeatherIcon(data.weatherCode)

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPinIcon className="h-4 w-4" />
          <span className="text-sm font-medium">
            {data.city}, {data.country}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {/* Temperatura principal e descricao */}
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-1">
              <span className="text-6xl font-display font-bold tracking-tight text-foreground">
                {data.temperature}
              </span>
              <span className="text-2xl font-display font-medium text-muted-foreground mb-2">
                {'°C'}
              </span>
            </div>
            <p className="text-base text-muted-foreground font-medium">
              {data.weatherDescription}
            </p>
          </div>

          {/* Icone do clima */}
          <div className="flex-shrink-0">
            <WeatherIcon className="h-20 w-20 text-primary" />
          </div>
        </div>

        {/* Detalhes adicionais */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="flex flex-col items-center gap-1.5">
            <ThermometerIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Sensacao</span>
            <span className="text-sm font-semibold text-foreground">{data.apparentTemperature}{'°C'}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <WindIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Vento</span>
            <span className="text-sm font-semibold text-foreground">{data.windSpeed} km/h</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <DropletIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Umidade</span>
            <span className="text-sm font-semibold text-foreground">{data.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
