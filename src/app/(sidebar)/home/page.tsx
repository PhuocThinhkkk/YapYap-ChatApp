export const dynamic = 'force-dynamic'

import { SidebarTrigger } from "@/components/ui/sidebar"
import UserInformation from "@/components/UserInformation"
import { getUserIdInSession } from "@/lib/session"
import { getUserById } from "@/lib/db/userdb"
import { getUserHomeStats } from "@/lib/db/stats"
import PremiumSection from "@/components/home/PremiumSection"
import MetricsSection from "@/components/home/MetricsSection"
import ProfileCard from "@/components/home/ProfileCard"
import QuickLinks from "@/components/home/QuickLinks"

export default async function Home() {
  const userId = await getUserIdInSession()

  const [user, stats] = await Promise.all([
    userId ? getUserById(userId).catch(() => null) : Promise.resolve(null),
    userId ? getUserHomeStats(userId) : Promise.resolve({
      friendCount: 0,
      roomCount: 0,
      messagesSent: 0,
      topInteractions: [],
      recentMessages: [],
    }),
  ])

  return (
    <>
      <header className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 text-lg font-semibold">Home</h1>
        <div className="absolute right-8">
          <UserInformation />
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-brand-100/30 to-brand-100/10">
        <main className="container mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Welcome back
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
                  {user
                    ? `Good to see you, ${user.name}. Here's what's happening in your chats.`
                    : "Ready to connect and chat? Sign in to see your stats and activity."}
                </p>
              </div>

              <PremiumSection />
              <MetricsSection stats={stats} isSignedIn={!!userId} />
            </div>

            <aside className="space-y-6">
              <ProfileCard user={user} />
              <QuickLinks />
            </aside>
          </div>
        </main>
      </div>
    </>
  )
}
