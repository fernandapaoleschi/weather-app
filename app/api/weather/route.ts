import { NextResponse } from 'next/server'
import { getWeatherForCity } from '@/lib/weather-service'

/**
 * GET /api/weather?city=nomeDaCidade
 *
 * Endpoint REST equivalente ao controller do NestJS.
 * Recebe o nome da cidade via query param e retorna os dados do clima
 * com recomendações inteligentes.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  // Validação do parâmetro obrigatório
  if (!city || city.trim().length === 0) {
    return NextResponse.json(
      { error: 'O parametro "city" e obrigatorio.' },
      { status: 400 },
    )
  }

  try {
    const weatherData = await getWeatherForCity(city.trim())
    return NextResponse.json(weatherData)
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Erro interno do servidor.'

    return NextResponse.json(
      { error: message },
      { status: 500 },
    )
  }
}
