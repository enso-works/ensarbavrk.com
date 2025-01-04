import { CalendarDays, CreditCard, Tags } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface Subscription {
  name: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  category: string
  startDate: string
}

const subscriptions: Subscription[] = [
  {
    name: "Netflix",
    price: 15.99,
    billingCycle: "monthly",
    category: "Entertainment",
    startDate: "2023-01-15"
  },
  {
    name: "Spotify",
    price: 9.99,
    billingCycle: "monthly",
    category: "Entertainment",
    startDate: "2023-02-01"
  },
  {
    name: "AWS",
    price: 150,
    billingCycle: "monthly",
    category: "Development",
    startDate: "2023-03-10"
  },
  {
    name: "GitHub Copilot",
    price: 10,
    billingCycle: "monthly",
    category: "Development",
    startDate: "2023-04-01"
  },
  {
    name: "Adobe Creative Cloud",
    price: 599.88,
    billingCycle: "yearly",
    category: "Design",
    startDate: "2023-01-01"
  }
]

export default function Spendings() {
  const categories = Array.from(new Set(subscriptions.map(sub => sub.category)))
  
  const monthlyTotal = subscriptions.reduce((total, sub) => {
    return total + (sub.billingCycle === 'yearly' ? sub.price / 12 : sub.price)
  }, 0)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">My Subscriptions</h1>
          <div className="inline-flex items-center gap-2 text-lg bg-primary/10 px-4 py-2 rounded-full">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="font-semibold">${monthlyTotal.toFixed(2)}</span>
            <span className="text-muted-foreground">per month</span>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Tags className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">{category}</h2>
              </div>
              
              <div className="space-y-4">
                {subscriptions
                  .filter(sub => sub.category === category)
                  .map(subscription => (
                    <Card key={subscription.name} className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {subscription.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              <span>Since {subscription.startDate}</span>
                            </div>
                            <Badge variant="secondary">
                              {subscription.billingCycle}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-semibold">
                            ${subscription.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {subscription.billingCycle === 'yearly' 
                              ? `$${(subscription.price / 12).toFixed(2)} /mo`
                              : 'per month'
                            }
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

