"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, } from "lucide-react"
import { useState, useEffect } from "react"

    type CardPlan = {
        title : string,
        description : string,
        price : number,
        time : "Day" | "Month" | "Year",
        features : string[],
        buttonText : string,
    }

    const freeFeatures = [
        "Up to 3 projects",
        "5GB storage",
        "Basic analytics",
        "Community support",
        "Standard templates",
        "Basic integrations",
    ]

    const premiumFeatures = [
        "Unlimited projects",
        "100GB storage",
        "Advanced analytics & insights",
        "Priority support (24/7)",
        "Premium templates & themes",
        "Advanced integrations",
        "Custom branding",
        "Team collaboration",
        "API access",
        "Advanced security features",
    ]
  const FreePlan : CardPlan = {
    title : "Free Plan",
    description : "Perfect for getting started",
    price : 0,
    time : "Month",
    features : freeFeatures,
    buttonText : "Get Started Free"
  }
    const PremiumPlan : CardPlan = {
    title : "Premium Plan",
    description : "For more features",
    price : 0,
    time : "Month",
    features : premiumFeatures,
    buttonText : "Start Premium Trial"
  }

const PricingSection = () => {
    const [isVisible, setIsVisible] = useState(false)
        useEffect(() => {
            setIsVisible(true)
        }, [])
    return (
            
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <PricingCard plan={FreePlan} isVisible={isVisible}/>
                    <PricingCard plan={PremiumPlan} isVisible={isVisible}/>
                </div>
            </div>
        </section>
    )
}

export default PricingSection

function PricingCard({ 
    plan, 
    isVisible 
} : {
    plan : CardPlan, 
    isVisible : boolean
}){
    return(
        <Card className={`relative border-2 hover:shadow-lg 
            transition-all duration-300 hover:scale-105 
            initial-hidden ${isVisible ? "animate-fade-in-left delay-500" : ""}`}>

            <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}$</span>
                    <span className="text-gray-600">/{plan.time}</span>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                    <li key={index} 
                    className={`flex items-center initial-hidden ${isVisible ? "animate-fade-in-up" : ""}`}
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                    </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="h-full items-end">
                <Button className="w-full " variant="outline">
                    {plan.buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}
