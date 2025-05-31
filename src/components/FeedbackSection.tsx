import { Card, CardContent,} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"


 const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The free plan was perfect for our MVP. Once we grew, upgrading to premium was a no-brainer. The advanced analytics helped us increase conversions by 40%.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Started with the free tier and loved the simplicity. The premium features like priority support and advanced integrations are worth every penny.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Developer",
      company: "CodeCraft",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Great value for money. The free plan has everything you need to get started, and premium unlocks powerful features for scaling.",
      rating: 4,
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "DataSync",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "We've been using the premium plan for 2 years. The reliability and support quality are exceptional. Highly recommend for any serious business.",
      rating: 5,
    },
  ]


const FeedbackSection = () => {
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
                <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                        {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
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