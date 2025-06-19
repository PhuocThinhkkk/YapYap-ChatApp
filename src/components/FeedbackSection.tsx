import { Card, CardContent,} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { get4FiveStarFeedbacks } from "@/lib/db/feedback"


const FeedbackSection = async () => {
  "use cache"
  const testimonials = await get4FiveStarFeedbacks()
  return (
    <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their workflow with FlowApp.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                    ))}
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.message}</p>
                <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.user.avatarUrl || "/placeholder.svg"} alt={testimonial.user.name} />
                    <AvatarFallback>
                        {testimonial.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold text-gray-900">{testimonial.user.name}</p>
                    <p className="text-sm text-gray-600">
                        {testimonial.user.role} at {testimonial.createdAt.toString()}
                    </p>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    </section>
  )
}

export default FeedbackSection