'use client'
import { Shield, AlarmClock, Cat } from "lucide-react"
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
            <h3 className="text-xl font-semibold mb-2">Vibe-Proof Security.</h3>
            <p className="text-gray-600">No creeps, no leaks. We lock your chats tighter than your exs heart</p>
            </div>
            <div className="text-center">
                <Cat  className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform animate-float" />
            <h3 className="text-xl font-semibold mb-2">Extra Drip</h3>
            <p className="text-gray-600">Custom emojis, themes, reactions — make your chats as loud as your fits.</p>
            </div>
            <div className="text-center">
                <AlarmClock  className="h-12 w-12 text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform animate-float" />
            <h3 className="text-xl font-semibold mb-2"> Early Access to Cool Stuff</h3>
            <p className="text-gray-600">Be first in line for new features. Beta squad energy only.</p>
            </div>
        </div>
        </div>
    </section>
  )
}

export default FeaturesComparision