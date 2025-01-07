import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from 'lucide-react'

export function UpcomingExpense() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Clock className="w-4 h-4 text-green-500" />
        <CardTitle className="text-base">Upcoming payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-semibold">614,15 PLN</div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Every month
          </div>
          <div>2024-04-15</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm">Loan no. 9282929292</div>
          <div className="text-sm text-muted-foreground">National Bank</div>
        </div>
      </CardContent>
    </Card>
  )
}

