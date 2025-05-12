
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"

export default function RoomsLoadingSkeleton() {
  const loadingCards = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {loadingCards.map((index) => (
        <Card className="m-4 border" key={index}>
          <div className="flex h-15 m-4">
            <div className="w-15 h-15">
              <Avatar>
                <Skeleton className="h-10 w-10 rounded-full" />
              </Avatar>
            </div>

            <CardHeader className="items-end">
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </div>
          <CardContent>
            <Skeleton className="h-4 w-28" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}