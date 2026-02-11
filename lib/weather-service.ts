import type {
  GeocodingResponse,
  OpenMeteoResponse,
  WeatherResponse,
} from './weather-types'
import { WMO_CODES } from './weather-types'
import { generateRecommendations } from './recommendations'

/**
 * Serviço de clima - equivalente ao service layer do NestJS.
 * Responsável por buscar dados da API Open-Meteo e processar a resposta.
 */

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Busca as coordenadas geográficas de uma cidade usando a API de geocoding.
 */
async function getCoordinates(city: string) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=pt`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao buscar coordenadas da cidade.')
  }

  const data: GeocodingResponse = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error(`Cidade "${city}" nao encontrada. Verifique o nome e tente novamente.`)
  }

  return data.results[0]
}

/**
 * Busca o clima atual usando as coordenadas da cidade.
 */
async function getCurrentWeather(latitude: number, longitude: number) {
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao buscar dados do clima.')
  }

  const data: OpenMeteoResponse = await response.json()
  return data.current
}

/**
 * Busca o clima de uma cidade e retorna os dados formatados com recomendações.
 * Fluxo: cidade -> geocoding -> coordenadas -> forecast -> processamento -> resposta.
 */
export async function getWeatherForCity(city: string): Promise<WeatherResponse> {
  // 1. Buscar coordenadas da cidade
  const location = await getCoordinates(city)

  // 2. Buscar clima atual
  const current = await getCurrentWeather(location.latitude, location.longitude)

  // 3. Processar dados do tempo
  const weatherInfo = WMO_CODES[current.weather_code] ?? {
    description: 'Desconhecido',
    category: 'cloudy' as const,
  }

  // 4. Gerar recomendações inteligentes
  const recommendations = generateRecommendations(
    current.temperature_2m,
    current.weather_code,
    current.wind_speed_10m,
  )

  // 5. Retornar resposta formatada
  return {
    city: location.name,
    country: location.country,
    temperature: Math.round(current.temperature_2m * 10) / 10,
    apparentTemperature: Math.round(current.apparent_temperature * 10) / 10,
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
    weatherCode: current.weather_code,
    weatherDescription: weatherInfo.description,
    recommendations,
  }
}
