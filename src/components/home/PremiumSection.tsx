import Link from "next/link"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PremiumSection() {
  return (
    <Card className="bg-gradient-to-r from-brand-900 to-brand-700 text-white border-0">
      <CardContent className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
            <p className="text-brand-100 mb-2">
              Unlock unlimited rooms, advanced search, and exclusive features
            </p>
            <Link href="/role">
              <Button
                variant="secondary"
                className="bg-white text-brand-900 hover:bg-brand-100/30 border border-transparent shadow-sm"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="text-8xl opacity-20">⭐</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
