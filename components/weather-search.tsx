'use client'

import { useState, type FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, LoaderIcon } from '@/components/weather-icons'

interface WeatherSearchProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

/**
 * Componente de busca de cidade.
 * Campo de input + botao com estado de loading.
 */
export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Digite o nome da cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 h-12 bg-card text-card-foreground border-border"
          disabled={isLoading}
          aria-label="Nome da cidade"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading || !city.trim()}
        className="h-12 px-6"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="h-4 w-4" />
            <span className="sr-only">Buscando...</span>
          </>
        ) : (
          'Buscar'
        )}
      </Button>
    </form>
  )
}
