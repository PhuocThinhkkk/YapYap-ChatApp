import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Search, HelpCircle } from "lucide-react"

const links = [
  {
    label: "chat rooms",
    href: "/rooms",
    icon: MessageCircle,
  },
  {
    label: "search ppl",
    href: "/search",
    icon: Search,
  },
  {
    label: "help center",
    href: "/feedbacks",
    icon: HelpCircle,
  },
]

export default function QuickLinks() {
  return (
    <Card className="shadow-sx border-none">
      <CardContent className="space-y-1">
        <div className="font-medium">Quick links</div>
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex gap-2 font-normal underline items-center rounded-md py-1 text-sm hover:bg-muted/50 transition-colors"
          >
            <span>{label}</span>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
