import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShirtIcon, ActivityIcon } from '@/components/weather-icons'
import type { Recommendations } from '@/lib/weather-types'

interface RecommendationsCardProps {
  recommendations: Recommendations
}

/**
 * Card de recomendacoes inteligentes.
 * Exibe sugestoes de roupas e atividades com badges estilizados.
 */
export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-display">Recomendacoes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Roupas */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShirtIcon className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">O que vestir</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendations.clothing.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="text-xs font-medium px-3 py-1"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Atividades */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Atividades sugeridas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendations.activities.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="text-xs font-medium px-3 py-1"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
