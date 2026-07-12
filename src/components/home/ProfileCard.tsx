import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SimpleUserType } from "@/type"

type ProfileCardProps = {
  user: SimpleUserType | null
}

export default function ProfileCard({ user }: ProfileCardProps) {
  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="size-14">
              <AvatarFallback className="text-lg">?</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Guest</p>
              <p className="text-sm text-muted-foreground">Not signed in</p>
            </div>
          </div>
          <Link
            href="/sign-in"
            className="text-sm underline underline-offset-4 text-brand-900 hover:text-brand-700"
          >
            sign in to your account
          </Link>
        </CardContent>
      </Card>
    )
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const bioo = user.bio ? 
  ( user.bio.length > 100 ? 
    user.bio.slice(0, 100) + "..." 
    : user.bio ) 
    : "No bio"

  return (
    <Card className="border-none shadown-sx">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-1">
          <Avatar className="size-14">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-semibold text-xl truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <span >{bioo + "\n"}</span>

        <Link
          href={`/users/${user._id}`}
          className="text-sm underline underline-offset-4 text-brand-900 hover:text-brand-700"
        >
          view your profile
        </Link>
      </CardContent>
    </Card>
  )
}
