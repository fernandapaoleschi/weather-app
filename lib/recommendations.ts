import type { Recommendations } from './weather-types'

/**
 * Sistema de recomendações inteligentes baseado no clima.
 * Gera sugestões de roupas e atividades com base na temperatura,
 * código do tempo (WMO) e velocidade do vento.
 */
export function generateRecommendations(
  temperature: number,
  weatherCode: number,
  windSpeed: number,
): Recommendations {
  const clothing: string[] = []
  const activities: string[] = []

  // --- Recomendações de roupas baseadas na temperatura ---
  if (temperature < 10) {
    clothing.push('Casaco pesado', 'Luvas', 'Cachecol', 'Gorro')
  } else if (temperature >= 10 && temperature < 18) {
    clothing.push('Casaco leve', 'Calca comprida', 'Blusa de manga longa')
  } else if (temperature >= 18 && temperature < 25) {
    clothing.push('Camiseta', 'Calca leve ou bermuda', 'Tenis confortavel')
  } else {
    clothing.push('Roupas leves', 'Bermuda', 'Camiseta regata', 'Sandalia')
  }

  // --- Recomendações baseadas no código do tempo (WMO) ---
  const isRainy = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  const isSnowy = [71, 73, 75, 77, 85, 86].includes(weatherCode)
  const isStormy = [95, 96, 99].includes(weatherCode)
  const isClear = [0, 1].includes(weatherCode)

  if (isRainy || isStormy) {
    clothing.push('Guarda-chuva', 'Capa de chuva')
  }

  if (isSnowy) {
    clothing.push('Botas impermeaveis', 'Roupa termica')
  }

  if (isClear && temperature >= 25) {
    clothing.push('Protetor solar', 'Oculos de sol', 'Chapeu')
  }

  // --- Recomendações baseadas no vento ---
  if (windSpeed > 40) {
    clothing.push('Corta-vento')
  }

  // --- Recomendações de atividades ---
  if (isRainy || isStormy) {
    activities.push(
      'Cinema ou teatro',
      'Visitar museu',
      'Leitura em casa',
      'Cozinhar algo especial',
    )
  } else if (isSnowy) {
    activities.push(
      'Chocolate quente em cafe',
      'Jogos de tabuleiro',
      'Maratona de filmes',
    )
  } else if (temperature < 10) {
    activities.push(
      'Visitar cafe aconchegante',
      'Shopping center',
      'Atividades indoor',
      'Spa ou sauna',
    )
  } else if (windSpeed > 40) {
    activities.push(
      'Evitar atividades ao ar livre',
      'Atividades em local fechado',
      'Yoga ou meditacao indoor',
    )
  } else if (isClear && temperature >= 18 && temperature < 30) {
    activities.push(
      'Caminhada ao ar livre',
      'Passeio no parque',
      'Piquenique',
      'Andar de bicicleta',
      'Corrida matinal',
    )
  } else if (temperature >= 30) {
    activities.push(
      'Ir a piscina ou praia',
      'Tomar sorvete',
      'Passeio no final da tarde',
      'Atividades aquaticas',
    )
  } else {
    activities.push(
      'Passeio ao ar livre',
      'Visitar pontos turisticos',
      'Fotografia urbana',
    )
  }

  return { clothing, activities }
}
