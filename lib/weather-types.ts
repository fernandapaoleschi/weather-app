/**
 * DTOs e tipos para a aplicação de previsão do tempo.
 * Equivalente aos DTOs do NestJS para tipagem forte.
 */

/** Resposta da API de geocoding do Open-Meteo */
export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

/** Resposta da API de previsão do Open-Meteo */
export interface OpenMeteoCurrentWeather {
  temperature_2m: number
  wind_speed_10m: number
  weather_code: number
  relative_humidity_2m: number
  apparent_temperature: number
}

export interface OpenMeteoResponse {
  current: OpenMeteoCurrentWeather
}

/** Recomendações inteligentes baseadas no clima */
export interface Recommendations {
  clothing: string[]
  activities: string[]
}

/** Resposta formatada da API de clima */
export interface WeatherResponse {
  city: string
  country: string
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  weatherDescription: string
  recommendations: Recommendations
}

/**
 * Mapeamento dos códigos WMO para descrições e categorias do tempo.
 * Usado para converter o weather_code da Open-Meteo em texto legível.
 */
export const WMO_CODES: Record<number, { description: string; category: 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' }> = {
  0: { description: 'Céu limpo', category: 'clear' },
  1: { description: 'Predominantemente limpo', category: 'clear' },
  2: { description: 'Parcialmente nublado', category: 'cloudy' },
  3: { description: 'Nublado', category: 'cloudy' },
  45: { description: 'Nevoeiro', category: 'cloudy' },
  48: { description: 'Nevoeiro com geada', category: 'cloudy' },
  51: { description: 'Garoa leve', category: 'rain' },
  53: { description: 'Garoa moderada', category: 'rain' },
  55: { description: 'Garoa densa', category: 'rain' },
  56: { description: 'Garoa congelante leve', category: 'rain' },
  57: { description: 'Garoa congelante densa', category: 'rain' },
  61: { description: 'Chuva leve', category: 'rain' },
  63: { description: 'Chuva moderada', category: 'rain' },
  65: { description: 'Chuva forte', category: 'rain' },
  66: { description: 'Chuva congelante leve', category: 'rain' },
  67: { description: 'Chuva congelante forte', category: 'rain' },
  71: { description: 'Neve leve', category: 'snow' },
  73: { description: 'Neve moderada', category: 'snow' },
  75: { description: 'Neve forte', category: 'snow' },
  77: { description: 'Grãos de neve', category: 'snow' },
  80: { description: 'Pancadas de chuva leve', category: 'rain' },
  81: { description: 'Pancadas de chuva moderada', category: 'rain' },
  82: { description: 'Pancadas de chuva forte', category: 'rain' },
  85: { description: 'Pancadas de neve leve', category: 'snow' },
  86: { description: 'Pancadas de neve forte', category: 'snow' },
  95: { description: 'Tempestade', category: 'storm' },
  96: { description: 'Tempestade com granizo leve', category: 'storm' },
  99: { description: 'Tempestade com granizo forte', category: 'storm' },
}
