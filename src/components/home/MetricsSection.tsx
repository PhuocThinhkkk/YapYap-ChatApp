import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { UserHomeStats } from "@/type"
import { MessageCircle, Users, DoorOpen, TrendingUp } from "lucide-react"

type MetricsSectionProps = {
  stats: UserHomeStats
  isSignedIn: boolean
}

function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

export default function MetricsSection({ stats, isSignedIn }: MetricsSectionProps) {
  const metricItems = [
    { label: "Friends", value: stats.friendCount, icon: Users },
    { label: "Rooms", value: stats.roomCount, icon: DoorOpen },
    { label: "Messages sent", value: stats.messagesSent, icon: MessageCircle },
  ]

  console.log(stats)

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-3">
        <div className="font-semibold ">Your activity</div>
        {!isSignedIn && (
          <p className="text-sm text-muted-foreground">
            Sign in to see your personal stats and recent activity.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metricItems.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-muted/30  flex items-center gap-3"
            >
              <div className="p-1  bg-brand-900/10 text-brand-900">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-brand-900" />
              <h4 className="font-semibold text-sm">Top interactions</h4>
            </div>
            {stats.topInteractions.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isSignedIn
                  ? "Start chatting to see your most active rooms and friends."
                  : "No data yet."}
              </p>
            ) : (
              <ul className="space-y-2">
                {stats.topInteractions.map((item) => (
                  <li
                    key={`${item.type}-${item._id}`}
                    className="flex items-center justify-between text-sm rounded-md border px-3 py-2"
                  >
                    <span className="truncate mr-2">
                      <span className="text-muted-foreground capitalize mr-1">
                        {item.type}:
                      </span>
                      {item.name}
                    </span>
                    <span className="text-muted-foreground shrink-0">
                      {item.count} msgs
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-4 w-4 text-brand-900" />
              <h4 className="font-semibold text-sm">Recent activity</h4>
            </div>
            {stats.recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isSignedIn
                  ? "Your latest messages will show up here."
                  : "No recent messages."}
              </p>
            ) : (
              <ul className="space-y-2">
                {stats.recentMessages.map((msg) => (
                  <li
                    key={msg._id}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    <p className="truncate text-foreground">{msg.info}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {msg.context} · {formatRelativeTime(msg.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
