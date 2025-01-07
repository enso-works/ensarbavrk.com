
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ExpensesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">This month expenses</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          April
          <ChevronDown className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square">
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-semibold">1356,24 PLN</div>
            <div className="text-sm text-muted-foreground">April 2024</div>
          </div>
          {/* This is a simplified donut chart. In a real app, you'd want to use a charting library */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-orange-400"
              strokeDasharray="28 72"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-blue-400"
              strokeDasharray="14 86"
              strokeDashoffset="-28"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-purple-400"
              strokeDasharray="14 86"
              strokeDashoffset="-42"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

