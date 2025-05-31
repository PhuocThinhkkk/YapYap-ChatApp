'use client'
import { Shield, Users, Headphones } from "lucide-react"
import { useState, useEffect } from "react"

const FeaturesComparision = () => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(()=>{
        setIsVisible(true)
    },[])
    return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
        <h2 className=
            {`text-3xl font-bold text-center mb-12 initial-hidden ${isVisible ? "animate-fade-in-up delay-300" : ""}`}>
            Why Choose Premium?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
                <Shield  className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform animate-float" />
            <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
            <p className="text-gray-600">Enterprise-grade security features to protect your data and users.</p>
            </div>
            <div className="text-center">
                <Users  className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform animate-float" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly with advanced team management tools.</p>
            </div>
            <div className="text-center">
                <Headphones  className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform animate-float" />
            <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
            <p className="text-gray-600">Get help when you need it with 24/7 priority customer support.</p>
            </div>
        </div>
        </div>
    </section>
  )
}

export default FeaturesComparision