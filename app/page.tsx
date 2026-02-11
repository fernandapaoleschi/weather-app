'use client'

import { useState, useCallback } from 'react'
import { WeatherSearch } from '@/components/weather-search'
import { WeatherCard } from '@/components/weather-card'
import { RecommendationsCard } from '@/components/recommendations-card'
import { CloudIcon, SunIcon } from '@/components/weather-icons'
import { getWeatherCategory } from '@/components/weather-icons'
import type { WeatherResponse } from '@/lib/weather-types'

/**
 * Mapeia a categoria do clima para classes de fundo dinamico.
 * O fundo da pagina muda conforme o clima retornado pela API.
 */
const WEATHER_BACKGROUNDS: Record<string, string> = {
  clear: 'from-amber-100 via-orange-50 to-yellow-50',
  cloudy: 'from-slate-200 via-gray-100 to-slate-100',
  rain: 'from-slate-300 via-blue-100 to-gray-200',
  snow: 'from-blue-100 via-sky-50 to-cyan-50',
  storm: 'from-slate-400 via-gray-300 to-slate-200',
  default: 'from-sky-100 via-blue-50 to-indigo-50',
}

export default function Page() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Busca o clima da cidade consumindo o endpoint REST /api/weather.
   */
  const handleSearch = useCallback(async (city: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar dados do clima.')
      }

      setWeather(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.')
      setWeather(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Determina o fundo dinamico baseado no clima atual
  const bgCategory = weather ? getWeatherCategory(weather.weatherCode) : 'default'
  const bgClasses = WEATHER_BACKGROUNDS[bgCategory]

  return (
    <main className={`min-h-screen bg-gradient-to-br ${bgClasses} transition-all duration-700`}>
      <div className="flex flex-col items-center px-4 py-12 md:py-20 gap-8 max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <SunIcon className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground text-balance">
              ClimaView
            </h1>
          </div>
          <p className="text-muted-foreground text-base max-w-sm text-pretty">
            Busque o clima de qualquer cidade e receba recomendacoes inteligentes.
          </p>
        </header>

        {/* Busca */}
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Erro */}
        {error && (
          <div
            role="alert"
            className="w-full max-w-md rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {/* Resultados */}
        {weather && !isLoading && (
          <div className="flex flex-col gap-5 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherCard data={weather} />
            <RecommendationsCard recommendations={weather.recommendations} />
          </div>
        )}

        {/* Estado vazio */}
        {!weather && !isLoading && !error && (
          <div className="flex flex-col items-center gap-4 mt-8 text-muted-foreground">
            <CloudIcon className="h-16 w-16 opacity-30" />
            <p className="text-sm">Digite uma cidade para ver a previsao do tempo</p>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="flex flex-col gap-5 w-full">
            <div className="h-52 rounded-lg bg-card/60 animate-pulse" />
            <div className="h-40 rounded-lg bg-card/60 animate-pulse" />
          </div>
        )}
      </div>
    </main>
  )
}
