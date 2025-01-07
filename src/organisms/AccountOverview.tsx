
import { Copy, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountOverview() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-primary rounded-full" />
            </span>
            <CardTitle className="text-base font-medium">Main personal account</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          12 1234 5432 6789 0000 1592
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Account balance</div>
          <div className="text-4xl font-semibold">5 200,64 PLN</div>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            + New transfer
          </Button>
          <Button variant="outline" className="gap-2">
            Full history
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

